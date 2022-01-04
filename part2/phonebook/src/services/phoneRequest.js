import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const deleteItem = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (url, data) => {
  return axios.put(url , data)
}

const create = (data) => {
  return axios.post(baseUrl, data)
}

const phoneService = { getAll, deleteItem, update, create } 

export default phoneService