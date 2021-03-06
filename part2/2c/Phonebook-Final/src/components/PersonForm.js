import React,{ useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({persons,setPersons,setMessage}) => {
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
    if (persons.some(person => person.name === newName)) {      //some returns T/F
      const person = persons.find(person => person.name === newName)           //find returns object
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) { 
        personService.update(person.id,personObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p:returnedPerson))
          setMessage(`${returnedPerson.name}'s number has been successfully changed to ${newNumber} `)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          setMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      })}
    }

    else if (persons.some(person => person.number === newNumber)) {
      return (window.alert(`${newNumber} already exist in the phonebook`))
    }
    
    else {
      personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Successfully Added ${personObject.name} `)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        setMessage(error.response.data.error);
      })
      }      
    
    }

  

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