import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content, votes) => {
  const object = { content, id: (100000 * Math.random()).toFixed(0),votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const getID = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const addVote = async (id,data) => {
  const response = await axios.put(`${baseUrl}/${id}`,data)
  return response.data
}

export default { getAll,createNew,getID,addVote}