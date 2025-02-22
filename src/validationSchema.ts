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
          .required("This field is required")
          .max(28, "Max age is 28"),
      })
    ),
  });
};
