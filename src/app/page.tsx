"use client";

import { useEffect, useMemo, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import useIndexedDB from "@@_hooks/useIndexedDB";
import Card from "@@_root/components/Card";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  current_state: string;
};

export default function Home() {
  const {
    openDB,
    getAllRecords,
    closeDB,
    addRecord,
    deleteRecord,
    updateRecord,
  } = useIndexedDB();
  const [records, setRecords] = useState<any>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const records_data = useMemo(
    () =>
      records
        ? records.sort((a: any, b: any) => (a.position < b.position ? -1 : 1))
        : [],
    [records]
  );

  const fetchRecords = async () => {
    const db = await openDB();
    const allRecords = await getAllRecords(db);
    setRecords(allRecords || []);
    closeDB(db);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const db = await openDB();
    const newRecord = {
      key: data.current_state,
      position: Number(records.length + 1),
    };
    await addRecord(db, newRecord);
    closeDB(db);
    alert("Done");
    setRecords([...records, newRecord]);
  };

  const onDelete = async (id: any) => {
    const db = await openDB();
    await deleteRecord(db, parseInt(id, 10));
    closeDB(db);
    alert("Done");
    setRecords(
      records
        .filter((el: any) => el.id !== id)
        .map((el: any, i: number) => ({ ...el, position: i + 1 }))
    );
  };

  const onEdit = async (item: any) => {
    const db = await openDB();
    const updatedData = item;
    await updateRecord(db, parseInt(item?.id, 10), updatedData);
    closeDB(db);
  };

  useEffect(() => {
    fetchRecords();
  }, [records]);

  const handleDragEnd = async (e: any) => {
    const { active, over } = e;
    const old_index = records.findIndex((rcd: any) => rcd.id === active.id);
    const new_index = records.findIndex((rcd: any) => rcd.id === over.id);
    const new_array = arrayMove(records, old_index, new_index).map(
      (el: any, i: number) => ({ ...el, position: i + 1 })
    );
    await Promise.all(new_array.map((el) => onEdit(el)));
    setRecords(new_array);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="w-full h-full flex flex-col gap-4 p-4">
        <h2 className="text-2xl font-medium">States</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            {...register("current_state", { required: true })}
            type="text"
            className="input input-bordered w-full max-w-xs"
          />
          {errors.current_state && <span>This field is required</span>}

          <input type="submit" className="btn w-full max-w-xs" />
        </form>
        <div className="flex flex-row gap-2 flex-wrap border p-4 rounded-md">
          <SortableContext
            items={records}
            strategy={horizontalListSortingStrategy}
          >
            {records_data?.map((item: any, i: number) => {
              return <Card key={i} item={item} onDelete={onDelete} />;
            })}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}
