import axios from "../utils/axiosCustomize";

const getCategory = () => {
  return axios.get(`category`);
};

const getProduct = () => {
  return axios.get(`product`);
};



export { getCategory, getProduct };
