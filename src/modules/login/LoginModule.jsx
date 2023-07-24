import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style/login-module.css";
import { Button } from "../../components";
import { useGlobalContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";

export const LoginModule = () => {
  const { setRolAdmin, setIsRol} = useGlobalContext();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
    role: Yup.string()
      .required("Selecciona un rol")
      .oneOf(["admin", "user"], "Rol inválido"),
  });
  return (
    <div className="container">
      <div className="background"></div>
      <div className="container-form">
        <Formik
          initialValues={{ email: "", password: "", role: "admin" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
              // se debe hacer peticion al servidor para autenticar, en este caso lo simulamos
            if (values.role=== "admin") {
              setRolAdmin(true);
            } else {
              setRolAdmin(false);
            }
            setIsRol(true);
            navigate ("/home");
          }}
        >
          <Form>
            <div>
              <label className="label" htmlFor="email">
                Email:
              </label>
              <Field className="input" type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label className="label" htmlFor="password">
                Password:
              </label>
              <Field
                className="input"
                type="password"
                id="password"
                name="password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div>
              <div className="container-check">
                <label>
                  <Field type="radio" name="role" value="admin" id="check" />{" "}
                  Admin
                </label>
                <label>
                  <Field type="radio" name="role" value="user" /> User
                </label>
              </div>
              <ErrorMessage name="role" component="div" className="error" />
            </div>
            <Button text="Enviar" type="primary" />
          </Form>
        </Formik>
      </div>
    </div>
  );
};
