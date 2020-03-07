import axios from 'axios';

export const getLists = async () => {
  const response = await axios.get(`category/list`);
  console.log(response.data);
  return response.data;
};
export const addList = async (data) => {
  const response = await axios.post(`insert?subject=${data.subject}&content=${data.content}&writer=${data.writer}`);
  // console.log(response.data);
  return response.data;
};
export const updateList = async (data,bno:number) => {
  const response = await axios.put(`update/${bno}?subject=${data.subject}&content=${data.content}`);
  // console.log(response.data);
  return response.data;
};
// export const deleteList = async id => {
//   const response = await axios.get(`delete/${id}`)
//   console.log(response.data,'asdasdzxcasd');
//   return response.data;
// };
export const deleteList = async (id:number) => {
  return  await axios.delete(`delete/${id}`);
};