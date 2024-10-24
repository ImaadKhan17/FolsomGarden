import apiClient from "./apiClient";

export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint); // Log the data
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const get_user_from_id = async (id) => {
  try {
    const response = await apiClient.get(`user/${id}`, );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unit_check = (item) =>{
  if(item.unit == "unit"){
    return item.name
  }
  return item.unit
}
export const get_category = (id) =>{
  if(id == "2"){
    return "fruits"
  }
  return "vegetables"
}