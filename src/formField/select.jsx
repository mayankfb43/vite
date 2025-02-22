import { useFormContext } from "react-hook-form";
export function Select({ index }) {
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <select
        {...register(`items.${index}.priority`)}
        className="border p-2 w-full rounded"
        onChange={(e) => {
          setValue(`items.${index}.priority`, e.target.value); // Update the priority value
          trigger(`items.${index}.quantity`, { shouldFocus: false }); // Revalidate quantity when priority changes
        }}
        class="form-select"
        aria-label="Default select example"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <span>
        {errors.items?.[index]?.priority &&
          errors.items[index].priority.message}
      </span>
    </>
  );
}
