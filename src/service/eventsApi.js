import axios from "axios";

export const getUsers = async () => {
  return await axios({
    method: "get",
    url: `https://jsonplaceholder.typicode.com/users`,
  });
};

export const createUser = async (data) => {
  return await axios({
    method: "post",
    url: `https://jsonplaceholder.typicode.com/users`,
    data,
  });
};

export const putUser = async (id, data) => {
  return await axios({
    method: "put",
    url: `https://jsonplaceholder.typicode.com/users/${id}`,
    data,
  });
};
