import { useState } from "react";
import Table from "rc-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUsers } from "../../service/eventsApi";
import { useEffect } from "react";
import { Create } from "../../components";
import "./style/home-module.css";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../../context/storeContext";



const columns = (rolAdmin, setItemEdit) => [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 100,
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "Correo",
    dataIndex: "email",
    key: "email",
    width: 100,
  },
  {
    title: "Sitio web",
    dataIndex: "website",
    key: "website",
    width: 100,
  },
  {
    title: "",
    dataIndex: "",
    key: "",
    width: 100,
    render: (item) => {
      const goToEdit = () => setItemEdit(item);
      return rolAdmin&&(
        <button onClick={goToEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      );
    },
  },
];

export const HomeModule = () => {
  const [list, setList] = useState([]);
  const { rolAdmin, setItemEdit } = useGlobalContext();

  const sendSubmit = async (e) => {
    try {
      const { data } = await getUsers();

      setList(data);
    } catch (err) {
      console.log("error en la base de datos");
    } finally {
    }
  };
  useEffect(() => {
    sendSubmit();
  }, []);

  return (
    <div className="container-home">
      {rolAdmin && <Create setList={setList} list={list} />}
      <Table columns={columns(rolAdmin, setItemEdit)} data={list} rowKey="id"  />
    </div>
  );
};
