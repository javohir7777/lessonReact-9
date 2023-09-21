import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

const LoginPages = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Email kiriting").required("Required"),
      password: yup
        .string("Password must be string")
        .required("Required")
        .min(8, "Must be 8 characters or less"),
    }),

    onSubmit: (values) => {
      try {
        axios.post("https://reqres.in/api/login", values).then(() => {
          formik.resetForm();
          navigate("/category");
        });
      } catch (error) {
        toast.error("Error");
      }
    },
  });
  console.log(formik.errors);
  return (
    <form
      className="vh-100 w-25 d-flex align-item-center justify-content-center flex-column container"
      onSubmit={formik.handleSubmit}
    >
      <div className="mb-3">
        <label className="form-label text-white" htmlFor="email">
          Email address
        </label>
        <input
          name="email"
          type="email"
          id="email"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p className="text-danger">{formik.errors.email}</p>
      </div>
      <div className="mb-3">
        <label className="form-label text-white" htmlFor="password">
          Password
        </label>
        <input
          name="password"
          type="password"
          id="password"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <p className="text-danger">{formik.errors.password}</p>
        <input type="submit" className="btn btn-primary w-100 my-4" />
      </div>
    </form>
  );
};

export default LoginPages;
