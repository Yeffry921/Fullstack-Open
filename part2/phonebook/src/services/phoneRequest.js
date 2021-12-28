import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const deleteItem = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (data) => {
  return axios.put(baseUrl, data)
}

const create = (data) => {
  return axios.post(baseUrl, data)
}

const phoneService = { getAll, deleteItem, update, create } 

export default phoneService