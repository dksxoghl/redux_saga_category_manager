import axios from 'axios';

export const getLists = async () => {
  const response = await axios.get(`category/list`);
  console.log(response.data);
  return response.data;
};
export const addList = async (data) => {
  const response = await axios.post(`category`,data);
  // console.log(response.data);
  return response.data;
};

export const updateList = async (data) => {
  const response = await axios.put(`category/${data.id}`,data);
  console.log(response,'업데이ㅡㅌ~~~~');
  return response.data;
};
// export const deleteList = async id => {
//   const response = await axios.get(`delete/${id}`)
//   console.log(response.data,'asdasdzxcasd');
//   return response.data;
// };
export const deleteList = async (id) => {
  return  await axios.delete(`category/${id}`);
};