import axios from "../utils/axiosCustomize";

const getCategory = () => {
  return axios.get(`category`);
};

const getProduct = () => {
  return axios.get(`product`);
};

const createUser = (body: any) => {
  return axios.post(`user/register`, body);
};

const updateUser = (id: number, body: any) => {
  return axios.put("user/" + id, body);
};
const deleteUser = (id: number) => {
  return axios.delete("user/" + id);
};

export { getCategory, getProduct, createUser, updateUser, deleteUser };
