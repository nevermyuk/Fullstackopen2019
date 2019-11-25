import React from 'react'
import personService from '../services/persons'

const Delete = ({person,setPersons,persons}) => {

    const handleDelete = (e) => {
        if (window.confirm(`Do you really want to delete ${person.name}`)) { 
            personService.deletePerson(person.id)
            .then(returnedPerson => {
                setPersons(persons.filter(p => p.id !== person.id))
          })}

        
    }

    return (
        <button onClick= {handleDelete}>DELETE</button>
    )
}
export default Delete