import React from 'react'
import personService from '../services/persons'

const Delete = ({person,setPersons,persons,setMessage}) => {

    const handleDelete = (e) => {
        if (window.confirm(`Do you really want to delete ${person.name}`))
         { 
            personService.deletePerson(person.id)
            .then(returnedPerson => {
                setPersons(persons.filter(p => p.id !== person.id))
                setMessage(`${person.name}'s has been successfully deleted `)
                setTimeout(() => {
                setMessage(null)
                }, 5000)
            })
            .catch(error => {
                setMessage(`Information of ${person.name} has already been removed from server`)
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
            })
         }

        
    }

    return (
        <button onClick= {handleDelete}>DELETE</button>
    )
}
export default Delete