import axios from 'axios'
const baseUrl = '/api/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = delID => {
    const request = axios.delete(`${baseUrl}/${delID}`)
    return request.then(response=>response.data)
}

const update = (updateID,changedPerson) => {
    const request = axios.put(`${baseUrl}/${updateID}`, changedPerson)
    return request.then(response => response.data)
}

export default {getAll,create,deletePerson,update}