import React,{ useState } from 'react'
import axios from 'axios'

const PersonForm = ({persons,setPersons}) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()    

    const personObject = {
      name: newName,
      number: newNumber
    }    
    if (persons.some(person => person.name === newName)) {
      return (window.alert(`${newName} is already added to phonebook`))
    }

    if (persons.some(person => person.number === newNumber)) {
      return (window.alert(`${newNumber} already exist in the phonebook`))
    }
    
    else {
      axios
      .post('http://localhost:3001/persons',
      personObject)
      .then(response => {
        axios.get('http://localhost:3001/persons')  //inefficient, 2 request just for POSTING!??!?!?
        .then(response => {
        setPersons(response.data)
      })})      
      setNewName('')
      setNewNumber('')
    
    }}

  

  return (      
    <form onSubmit = {addName} >
    <div>name: <input required value = {newName} onChange = {handleNameChange} /></div>
    <div>number: <input required value = {newNumber} onChange = {handleNumberChange} /></div>
    <div>
      <button type="submit">add</button>
    </div>
    </form>

  )



}

export default PersonForm