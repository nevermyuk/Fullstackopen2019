import React, { useState , useEffect} from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [Message , setMessage] = useState(null)


  useEffect(() => {
      personService.getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification  message = {Message}/>
      <Filter persons = {persons}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} setMessage={setMessage}/>
    </div>
  )
}

export default App