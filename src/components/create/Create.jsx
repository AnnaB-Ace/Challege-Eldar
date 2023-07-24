import {  useFormik } from "formik";
import * as Yup from "yup";
import { createUser, putUser } from "../../service/eventsApi";
import { Button } from "../../components";
import "./style/create.css";
import { useGlobalContext } from "../../context/storeContext";
import { useEffect } from "react";

export const Create = ({ list, setList }) => {
  const { itemEdit } = useGlobalContext();
  const form = useFormik({
    initialValues: {
      id: "",
      name: "",
      email: "",
      website: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("El nombre es obligatorio"),
      email: Yup.string()
        .email("Email inválido")
        .required("El email es obligatorio"),
      website: Yup.string().required("La URL es obligatoria"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (values.id) {
        updateItem(values)
      }else {
       const numberId = list.length + 1;
       const newValue = { ...values, id: numberId };
       createItem(newValue)
      }
      resetForm()

    },
  });

  const createItem = async (values) => {
    try {
      await createUser(values);
      setList([...list, values]);
    } catch (err) {
      console.log("error en la base de datos");
    }
  };

  const updateItem = async (values) => {
    try {
      await putUser(values.id, values);
      setList([...list].map((item) => (item.id === values.id ? values : item)));
    } catch (err) {
      console.log("error en la base de datos");
    }
  };

  useEffect(() => {
    if (itemEdit) {
      form.setValues(itemEdit);
    }
  }, [itemEdit]);

  return (
    <div className="container-form form-create">
      <form onSubmit={form.handleSubmit}>
        <div>
          <label className="label" htmlFor="name">
            Nombre:
          </label>
          <input
            value={form.values.name}
            className="input"
            type="name"
            id="name"
            name="name"
            onChange={form.handleChange}
          />
          <p className="error">{form.errors.name}</p>
        </div>
        <div>
          <label className="label" htmlFor="email">
            Email:
          </label>
          <input
            value={form.values.email}
            className="input"
            type="email"
            id="email"
            name="email"
            onChange={form.handleChange}
          />
          <p className="error">{form.errors.email}</p>
        </div>

        <div>
          <label className="label" htmlFor="website">
            Website:
          </label>
          <input
            value={form.values.website}
            className="input"
            type="website"
            id="website"
            name="website"
            onChange={form.handleChange}
          />
          <p className="error">{form.errors.website}</p>
        </div>

        <Button text="Enviar" type="primary" />
      </form>
    </div>
  );
};

