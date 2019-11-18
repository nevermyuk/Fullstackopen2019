import React,{ useState } from 'react'

const Filter = ({persons}) => {
        
    const [ newFilter, setNewFilter ] = useState('')
    const handleFilterChange = (event) => setNewFilter(event.target.value)
    
    const results = !newFilter ? [] : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) 
//results.map((person => <p key = {person.name}>{person.name}   {person.number}</p>))
    return (
        <div>Filter shown with <input value={newFilter} onChange={handleFilterChange} />
        {results.map((person => <p key = {person.name}>{person.name}   {person.number}</p>))}
        </div>

    )

  }

export default Filter