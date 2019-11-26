import React, { useState , useEffect} from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [successMessage , setSuccessMessage] = useState(null)


  useEffect(() => {
      personService.getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])



  return (
    <div>
      <Notification  message ={successMessage}/>
      <h2>Phonebook</h2>
      <Filter persons = {persons}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setSuccessMessage={setSuccessMessage} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App