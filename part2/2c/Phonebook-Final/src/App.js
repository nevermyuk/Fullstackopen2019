import React, { useState , useEffect} from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
      personService.getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons = {persons}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App