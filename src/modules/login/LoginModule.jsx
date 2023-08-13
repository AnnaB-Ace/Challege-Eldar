import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import "./style/login-module.css";
import { Button } from "../../components";
import { useGlobalContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";

export const LoginModule = () => {
  const { setRolAdmin, setIsRol } = useGlobalContext();
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
      },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Email inválido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es obligatoria"),
      role: Yup.string()
        .required("Selecciona un rol")
        .oneOf(["admin", "user"], "Rol inválido"),
    }),
    onSubmit: (values, {resetForm}) => {
      resetForm()
      if (values.role=== "admin") {
        setRolAdmin(true);
      } else {
        setRolAdmin(false);
      }
      setIsRol(true);
      navigate ("/home");
    },
  });

  return (
    <div className="container">
      <div className="background"></div>
      <div className="container-form">
        <form onSubmit={form.handleSubmit}>
          <div>
            <label className="label" htmlFor="email"></label>
            <input
              type="email"
              name="email"
              className="input"
              onChange={form.handleChange}
              value={form.values.email}
            />
            <p className="error">{form.errors.email}</p>
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="input"
              onChange={form.handleChange}
              value={form.values.password}
            />
            <p className="error">{form.errors.password}</p>
          </div>

          <div>
            <div className="container-check">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={form.values.role === 'admin'}
                  onChange={form.handleChange}
                />
                Admin
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={form.values.role === 'user'}
                  onChange={form.handleChange}
                />
                User
              </label>
            </div>
            <p className="error">{form.errors.role}</p>
          </div>
          <Button text="Enviar" type="primary" />
        </form>
      </div>
    </div>
  );
};
