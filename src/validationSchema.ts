// @ts-nocheck
import * as yup from "yup";
export const getValidationSchema = (watch: any) => {
  return yup.object().shape({
    students: yup.array().of(
      yup.object().shape({
        name: yup
          .string()
          .test("unique-names", "Names must be unique", function (value) {
            const names = watch("name")["students"] || [];
            let nameArr = names.map((n: any) => n.name);

            let s = new Set(nameArr);
            return nameArr.length === s.size;
          })
          .required("Name is required")
          .max(10, "Maximum length is 10 characters"),

        age: yup
          .string()
          .test("min-age", "height must be greater than 20", function () {
            const index = this.path.match(/\d+/)[0];
            const students = watch()["students"] || [];
            return students[index].height > 20;
          })
          .required("This field is required")
          .max(28, "Max age is 28")
          .test("min-age", "Age must be greater than 18", function () {
            const index = this.path.match(/\d+/)[0];
            const names = watch("name")["students"] || [];
            let nameArr = names.map((n: any) => n.age);

            return nameArr[index] > 18;
          }),
        height: yup
          .number()
          .required("This field is required")
          .test("min-age", "height must be greater than 18", async function () {
            const index = this.path.match(/\d+/)[0];
            const names = watch("name")["students"] || [];
            let nameArr = names.map((n: any) => n.height);

            return nameArr[index] > 18;
          }),
        skills: yup
          .array()
          .required("This field is required")
          .test("skills", "At least 2 skills required", function () {
            const index = this.path.match(/\d+/)[0];
            const students = watch() || [];

            return students["students"][index].skills.length >= 2
              ? true
              : false;
          }),
        gender: yup
          .string()
          .oneOf(["Male", "Female"], "Gender is required")
          .required("Gender is required"), // ✅ Add required validation
      })
    ),
  });
};
