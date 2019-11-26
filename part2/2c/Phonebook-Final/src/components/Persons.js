import React from 'react'
import Delete from './Delete'

const Persons = ({persons,setPersons,setMessage}) => persons.map((person) => {
    return (
        <div key={person.id}>
        <p >{person.name}  {person.number}</p>
        <Delete persons = {persons} person = {person} setPersons={setPersons} setMessage={setMessage}/>
        </div>
        )
})

export default Persons