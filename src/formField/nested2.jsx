import { useFormContext } from "react-hook-form";

export function Quantity({ index }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <input
        {...register(`items.${index}.quantity`)}
        type="number"
        class="form-control"
        type="text"
        placeholder="Default input"
        aria-label="default input example"
      />

      <span>
        {errors.items?.[index]?.quantity &&
          errors.items[index].quantity.message}
      </span>
    </>
  );
}
