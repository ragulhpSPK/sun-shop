import axios from "axios";

// Categories starting
export const createCatagory = (formData) => {
  return axios.post("/api/catagory", formData);
};

export const getAllCatagory = () => {
  return axios.get("/api/catagory");
};

export const updateCatagory = (formData) => {
  return axios.put("/api/catagory", formData);
};

export const deleteCatagory = (formData) => {
  return axios.delete(`/api/catagory/${formData}`);
};
// categories ended...

//SubCategory Starting
export const createSubCatagory = (formData) => {
  return axios.post("/api/subcategory", formData);
};
export const getAllSubCatagory = () => {
  return axios.get("/api/subcategory");
};

export const updateSubCategory = (formData) => {
  return axios.put("/api/subcategory", formData);
};

export const deleteSubCategory = (formData) => {
  return axios.delete(`/api/subcategory/${formData}`);
};
//SubCategory ended...

//products Starting...
export const createProducts = (formData) => {
  return axios.post("/api/products", formData);
};

export const getAllproducts = () => {
  return axios.get("/api/products");
};

export const updateProducts = (formData) => {
  return axios.put("/api/products", formData);
};

export const deleteProducts = (formData) => {
  return axios.delete(`/api/products/${formData}`);
};
//product Ended...

//Banner starting...
export const createBanner = (formData) => {
  return axios.post("/api/banner", formData);
};

export const getAllBanner = () => {
  return axios.get("/api/banner");
};

export const updateBanner = (formData) => {
  return axios.put("/api/banner", formData);
};

export const deleteBanner = (formData) => {
  return axios.delete(`/api/banner/${formData}`);
};

//Banner ended....

//Cart Starting...
export const createCart = (formData) => {
  return axios.post("/api/cart", formData);
};

export const getAllCart = () => {
  return axios.get("/api/cart");
};

export const updateCart = (formData) => {
  return axios.put("/api/cart", formData);
};

export const deleteCart = (formData) => {
  return axios.delete(`/api/cart/${formData}`);
};
// Banner

// Order Stating

export const createOrder = (formData) => {
  return axios.post("/api/order", formData);
};

export const getAllOrder = () => {
  return axios.get("/api/order");
};

export const updateOrder = (formData) => {
  return axios.put("/api/order/", formData);
};

export const deleteOrder = (formData) => {
  return axios.delete(`/api/order/${formData}`);
};

// Order Ended

// Auth Started

export const createMessage = (formData) => {
  return axios.post("/api/auth", formData);
};

//Auth Ended

//Top Products

export const createTopProducts = (formData) => {
  return axios.post("/api/TopProducts", formData);
};

export const getAllTopProducts = () => {
  return axios.get("/api/TopProducts");
};

export const deleteTopProducts = (formData) => {
  return axios.delete(`/api/TopProducts/${formData}`);
};

export const addOrRemoveTopProducts = (formData) => {
  axios.put(`/api/TopProducts/`, formData);
};
