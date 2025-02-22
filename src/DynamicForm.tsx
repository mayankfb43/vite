// @ts-nocheck
import { Field } from "@m/alchemy-ui/Field";
import { Input } from "@m/alchemy-ui/Input";
import { Button } from "@m/alchemy-ui/Button";
import React, { useEffect, useState } from "react";
import { RangeInput } from "@m/alchemy-ui/RangeInput";
import { MultiSelect } from "@m/alchemy-ui/MultiSelect";
import { Radio } from "@m/alchemy-ui/Radio";
import { RadioGroup } from "@m/alchemy-ui/RadioGroup";
import { Grid } from "@m/alchemy-ui/Grid";
import { GridRow } from "@m/alchemy-ui/GridRow";
import { GridCol } from "@m/alchemy-ui/GridCol";
import { Select } from "@m/alchemy-ui/Select";

import {
  useForm,
  useFieldArray,
  FormProvider,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getValidationSchema } from "./validationSchema"; // Import the Yup schema
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import { Fieldset } from "@m/alchemy-ui/Fieldset";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { fetchStudents, saveStudents } from "./app/features/usersSlice";

export function DynamicForm() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const students = useSelector((state) => state.user.students);

  useEffect(() => {
    if (students) {
      reset({ students });
    }
  }, [students]);

  const methods = useForm({
    defaultValues: {
      students: students,
    },
    resolver: yupResolver(getValidationSchema(() => methods.watch())),
  });
  const [value, setValue] = useState(50);
  const items = ["Male", "Female"];

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    trigger,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "students",
  });

  const onSubmit = (data: any) => {
    dispatch(saveStudents({ students: data.students, index: 0 }));
  };

  return (
    <>
      <GridRow>
        <GridCol
          style={{
            display: "flex",
            alignItems: "flexStart",
            flexDirection: "row",
            padding: "2rem",
            gap: "2rem",
          }}
        >
          <Button
            type="submit"
            size="small"
            onClick={handleSubmit(onSubmit)} // Trigger form submission when clicked
            style={{ width: "10rem" }}
            priority="success"
            data-testid="submit-button"
          >
            Submit
          </Button>
          <Button
            type="button"
            priority="success"
            style={{ width: "10rem" }}
            onClick={() =>
              append({
                id: uuidv4(),
                name: "",
                age: "",
                height: 0,
                skills: [],
                gender: "",
              })
            }
            size="small"
          >
            Add Student
          </Button>
        </GridCol>
      </GridRow>
      {students.length === 0 ? (
        <p>ERROR</p>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-3 border rounded row"
          >
            <Grid>
              <GridRow offset={{ small: 3, medium: 1, large: 6 }}>
                {fields.map((field, index) => (
                  <GridCol
                    key={field.id}
                    data-testid="student-form"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      padding: "2rem",
                    }}
                    span={{ small: 12, medium: 4 }}
                    justicy="center"
                  >
                    <React.Fragment key={field.id}>
                      <div
                        style={{
                          backgroundColor: "whitesmoke",
                          padding: "2rem",
                          borderRadius: "1rem",
                        }}
                      >
                        <Field
                          label="Name"
                          input={
                            <Input
                              {...register(`students.${index}.name`)}
                              data-testid="name-input"
                            />
                          }
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
                          label="Age"
                          input={
                            <Input {...register(`students.${index}.age`)} />
                          }
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
                                  onChange={async (value) => {
                                    field.onChange(value);
                                  }}
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
                                    {
                                      label: "Javascript",
                                      value: "second_value",
                                    },
                                    { label: "CSS 3", value: "third_value" },
                                    {
                                      label: "Disabled option",
                                      value: "disabled_value",
                                      disabled: true,
                                    },
                                  ]}
                                  defaultValues={() => {
                                    return field.value.map((val) => {
                                      return [
                                        {
                                          label: "React",
                                          value: "first_value",
                                        },
                                        {
                                          label: "Javascript",
                                          value: "second_value",
                                        },
                                        {
                                          label: "CSS 3",
                                          value: "third_value",
                                        },
                                        {
                                          label: "Disabled option",
                                          value: "disabled_value",
                                          disabled: true,
                                        },
                                      ].find((skill) => {
                                        return skill.value === val;
                                      });
                                    });
                                  }}
                                  onChange={(selected) =>
                                    field.onChange(
                                      selected.map((item) => item.value)
                                    )
                                  }
                                />
                              }
                            />
                          )}
                        />
                        <Controller
                          name={`students.${index}.gender`}
                          control={control}
                          render={({ field, fieldState }) => {
                            return (
                              <Fieldset
                                label="Gender"
                                description="Select gender"
                                status={
                                  fieldState.error?.message // ✅ Ensure error message is displayed
                                    ? {
                                        level: "error",
                                        message: fieldState.error.message,
                                      }
                                    : null
                                }
                                input={
                                  <RadioGroup
                                    layout="row"
                                    selection={field.value}
                                  >
                                    {({ isSelected, handleChange }) =>
                                      items.map((item) => (
                                        <Radio
                                          key={item}
                                          label={item}
                                          name={`students.${index}.gender`} // ✅ Ensure name is dynamic
                                          checked={isSelected(item)}
                                          onChange={() => field.onChange(item)}
                                        />
                                      ))
                                    }
                                  </RadioGroup>
                                }
                              />
                            );
                          }}
                        />
                        <Controller
                          name={`students.${index}.fruit`}
                          control={control}
                          render={({ field, fieldState }) => (
                            <Field
                              label="Label"
                              required
                              input={
                                <Select
                                  hasStatus
                                  palette="interactiveDestructive"
                                  defaultValue={field.value}
                                  options={[
                                    {
                                      label: "- Select an option -",
                                      value: "",
                                    },
                                    { label: "Apple", value: "a_value" },
                                    { label: "Banana", value: "b_value" },
                                    { label: "Cherry", value: "c_value" },
                                  ]}
                                  onChange={(fruit) => {
                                    field.onChange(fruit.value);
                                  }}
                                />
                              }
                              status={
                                errors.students?.[index]?.fruit
                                  ? {
                                      level: "error",
                                      message:
                                        errors.students[index].fruit.message,
                                    }
                                  : undefined
                              }
                            />
                          )}
                        />

                        <Button
                          style={{ width: "10rem", marginBottom: "1rem" }}
                          type="danger"
                          onClick={() => {
                            const currentValues = watch("students"); // Get current form values
                            const updatedStudents = [...currentValues];
                            updatedStudents[index] = {
                              id: uuidv4(), // Ensure a new unique ID if necessary
                              name: "",
                              age: "",
                              height: 0,
                              skills: [],
                              gender: "",
                            };

                            reset({ students: updatedStudents }); // Apply reset with the modified array
                          }}
                        >
                          Reset This Student
                        </Button>
                        <Button
                          destructive
                          type="button"
                          disabled={fields.length === 1}
                          onClick={() => remove(index)}
                          style={{ width: "10rem" }}
                        >
                          remove
                        </Button>
                      </div>
                    </React.Fragment>
                  </GridCol>
                ))}
              </GridRow>
            </Grid>
          </form>
        </FormProvider>
      )}

      {/* Debugging */}
      {/*<pre>{JSON.stringify(watch(), null, 2)}</pre>*/}
    </>
  );
}
