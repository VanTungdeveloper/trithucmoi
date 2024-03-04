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

export { getCategory, getProduct, createUser };
