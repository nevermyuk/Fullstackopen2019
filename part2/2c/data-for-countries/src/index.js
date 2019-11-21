import React,{ useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

const MultiDisplay = ({results}) => {
            return  (
                results.map((country => {
                return (
                <div key = {country.alpha3code}>
                <p key = {country.name}><button onClick={handleShowChange}>SHOW</button></p>
                <p>{country.capital}</p>
                <p>Population {country.population}</p>
                <h2>languages</h2>
                
                <ul>{country.languages.map((language)=>{
        
                return (<li key={language.iso639_1}>{language.name}</li>)
            })}</ul>
                <img src = {country.flag} alt = {country.name} height="100" width="100"/> 
                </div>
                )}))
            )}


const Display = ({results}) => {
    return  (<div>
        <h1>{results[0].name}</h1>
        <p>{results[0].capital}</p>
        <p>Population {results[0].population}</p>
        <h2>languages</h2>
        
        <ul>{results[0].languages.map((language)=>{

        return (<li key={language.iso639_1}>{language.name}</li>)
    })}</ul>
        <img src = {results[0].flag} alt = {results[0].name} height="100" width="100"/></div>)
    }



const App = () => {
    const [countries,setCountries] = useState([])
    const [newQuery, setNewQuery] = useState('')
    const [show , setShow] = useState([])

    const handleShowChange = () => setShow([])
       
    const handleQueryChange = (event) => setNewQuery(event.target.value) 
    useEffect(()=> {

        axios.get('https://restcountries.eu/rest/v2/all')
        .then((response) => setCountries(response.data))
    
    },[])


    const results = !newQuery ? [] : countries.filter(country => country.name.toLowerCase().includes(newQuery.toLowerCase())) 
    console.log(results)
    return (
    <div>
        Find countries <input value = {newQuery} onChange = {handleQueryChange}/>
        {results.length > 10 ? 
        <p>Too many matches,specify another filter</p> 
        : (results.length === 1) ?
       
        <Display results = {results} />: <MultiDisplay />}
    </div>
        
        
        

    )
}



ReactDOM.render(<App />,document.getElementById('root'))