"use client";
import Multiclient from "@@_components/Multiclient";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  client_prop: string;
};

const Override = () => {
  const [client, set_client] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({defaultValues: {client_prop: "core"}});

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("dd")
    set_client(data.client_prop);
  };

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-4xl font-semibold">Override</h1>
      <hr />
      <div className="w-full flex flex-col items-center p-6 gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row justify-end items-end gap-2"
        >
          <label>
            Clients
            <select
              {...register("client_prop")}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Select Client
              </option>
              <option value="core">Core</option>
              <option value="sandbox">Sandbox</option>
              <option value="test">Test</option>
              <option value="random">Random</option>
            </select>
          </label>
          <button className="btn btn-info">Ver</button>
          {errors.client_prop && <span>This field is required</span>}
        </form>
        <Multiclient
          path_override="components/ComponentCore"
          name="Project"
          client_prop={client}
        />
      </div>
    </div>
  );
};

export default Override;
