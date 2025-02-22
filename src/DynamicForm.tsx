// @ts-nocheck
import { Field } from "@m/alchemy-ui/Field";
import { Input } from "@m/alchemy-ui/Input";
import { Button } from "@m/alchemy-ui/Button";
import React from "react";

import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getValidationSchema } from "./validationSchema"; // Import the Yup schema
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

export function DynamicForm() {
  const methods = useForm({
    defaultValues: {
      students: [],
    },
    rresolver: (data, context, options) => {
      yupResolver(getValidationSchema(methods.watch))(data, context, options);
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const { fields, append } = useFieldArray({
    control,
    name: "students",
  });

  const onSubmit = (data: any) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-3 border rounded row"
        >
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <Field
                required
                label="Name"
                input={<Input {...register(`students.${index}.name`)} />}
                status={
                  errors.students?.[index]?.name
                    ? {
                        level: "error",
                        message: errors.students[index].name.message,
                      }
                    : undefined
                }
              />
              <Field
                required
                label="Age"
                input={<Input {...register(`students.${index}.age`)} />}
                status={
                  errors.students?.[index]?.age
                    ? {
                        level: "error",
                        message: errors.students[index].age.message,
                      }
                    : undefined
                }
              />
            </React.Fragment>
          ))}

          <Button type="submit" size="small">
            Submit
          </Button>
          <Button
            type="button"
            onClick={() => append({ id: uuidv4(), name: "", age: "" })}
            size="small"
          >
            Add Student
          </Button>
        </form>
      </FormProvider>

      {/* Debugging */}
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </>
  );
}
