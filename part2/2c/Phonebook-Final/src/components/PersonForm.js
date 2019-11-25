import React,{ useState } from 'react'
import personService from '../services/persons'

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
      const person = persons.find(person => person.name === newName)
      console.log(person)
      const changedPersons =  { ...persons}
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) { 
        personService.update(person.id,changedPersons)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? person : returnedPerson.data))
        })
      }
    }

    if (persons.some(person => person.number === newNumber)) {
      return (window.alert(`${newNumber} already exist in the phonebook`))
    }
    
    else {
      personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
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