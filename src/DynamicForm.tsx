// @ts-nocheck
import { Field } from "@m/alchemy-ui/Field";
import { Input } from "@m/alchemy-ui/Input";
import { Button } from "@m/alchemy-ui/Button";
import React, { useState } from "react";
import { RangeInput } from "@m/alchemy-ui/RangeInput";
import { MultiSelect } from "@m/alchemy-ui/MultiSelect";

import {
  useForm,
  useFieldArray,
  FormProvider,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getValidationSchema } from "./validationSchema"; // Import the Yup schema
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

export function DynamicForm() {
  const methods = useForm({
    defaultValues: {
      students: [],
    },
    resolver: yupResolver(getValidationSchema(() => methods.watch())),
  });
  const [value, setValue] = useState(50);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
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
              <Controller
                name={`students.${index}.height`}
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    label="Range"
                    description="Select a range"
                    status={
                      fieldState.error?.message
                        ? {
                            level: "error",
                            message: fieldState.error.message,
                          }
                        : null
                    }
                    input={
                      <RangeInput
                        ref={field.ref}
                        min={0}
                        max={100}
                        {...field}
                      />
                    }
                  />
                )}
              />
              <Controller
                name={`students.${index}.skills`}
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    label="Skills"
                    description="Select skills"
                    status={
                      fieldState.error?.message
                        ? {
                            level: "error",
                            message: fieldState.error.message,
                          }
                        : null
                    }
                    input={
                      <MultiSelect
                        ref={field.ref}
                        options={[
                          { label: "React", value: "first_value" },
                          { label: "Javascript", value: "second_value" },
                          { label: "CSS 3", value: "third_value" },
                          {
                            label: "Disabled option",
                            value: "disabled_value",
                            disabled: true,
                          },
                        ]}
                        onChange={(selected) =>
                          field.onChange(selected.map((item) => item.value))
                        }
                      />
                    }
                  />
                )}
              />
              <Button
                type="button"
                disabled={fields.length === 1}
                onClick={() => remove(index)}
              >
                remove
              </Button>
            </React.Fragment>
          ))}

          <Button type="submit" size="small">
            Submit
          </Button>
          <Button
            type="button"
            onClick={() =>
              append({ id: uuidv4(), name: "", age: "", height: 0, skills: [] })
            }
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
