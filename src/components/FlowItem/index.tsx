import { Controller } from "react-hook-form";

const FlowItem = ({ records, index, flowItem, control }: any) => {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      <Controller
        name={`flowItem?.fields[${index}].from`}
        defaultValue={flowItem?.fields[index]?.from || ""}
        control={control}
        render={({ value, onChange }: any) => (
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Who shot first?
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        )}
      />
      <Controller
        name={`flowItem?.fields[${index}].action`}
        defaultValue={flowItem?.fields[index]?.action || ""}
        control={control}
        render={({ value, onChange }: any) => (
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        )}
      />
      <Controller
        name={`flowItem?.fields[${index}].to`}
        defaultValue={flowItem?.fields[index]?.to || ""}
        control={control}
        render={({ value, onChange }: any) => (
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Who shot first?
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        )}
      />
      <div className="flex flex-row justify-end items-end">
        <button className="btn">Remove</button>
      </div>
    </div>
  );
};

export default FlowItem;
