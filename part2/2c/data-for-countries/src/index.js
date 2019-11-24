import React,{ useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'


const Display = ({results}) => {
    if  (results.length > 10) {
        return <p>Too many matches,specify another filter</p> 
    } 
    if  (results.length === 1) {
        return (
            results.map((country => {
                return (
                <div key = {country.name}>
                <h1>{country.name}  </h1>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
                <h2>languages</h2>
                <ul>{country.languages.map((language)=>{
                    return (<li key={language.iso639_1}>{language.name}</li>)
                })}</ul>
                <img src = {country.flag} alt = {country.name} height="100" width="100"/>
                <Weather capital = {country.capital}/>
                </div>
                )})))}
            
    return  (
            results.map((country => {
            return (
            <div key = {country.name}>
            <h1>{country.name}  </h1>
            <Button country = {country} />
            </div>
                )}))
            )}



const Button = ({country}) => {
    const [show, setShow] = React.useState(false)

    return (
        <>
        <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"}
        </button>
        {show &&
        <>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>
        <h2>languages</h2>

        <ul>{country.languages.map((language)=>{
            return (<li key={language.iso639_1}>{language.name}</li>)
        })}</ul>
        <img src = {country.flag} alt = {country.name} height="100" width="100"/>
        <Weather capital = {country.capital}/>
        </>}
        </>

        
    )
    }

const Weather = ({capital}) => {
    
    const [weather,SetWeather] = useState('')
    
    useEffect(()=> {
            axios.get(`http://api.weatherstack.com/current?access_key=c1475926e01a1e2c15a11ab7dee064ce&query=${capital}`)
            .then((response) => SetWeather(response.data.current))
        },[capital])
    console.log(weather)
        return (
            <div>
            <h1>Weather in {capital}</h1>
            <p>Temperature : {weather["temperature"]}</p>
            <img src = {weather["weather_icons"]} alt ="weather"  height="100" width="100"/>
            <p>wind: {weather["wind_speed"]} direction {weather["wind_dir"]}</p>
            </div>
        )
    }
const App = () => {
    const [countries,setCountries] = useState([])
    const [newQuery, setNewQuery] = useState('')



       
    const handleQueryChange = (event) => setNewQuery(event.target.value) 
    useEffect(()=> {

        axios.get('https://restcountries.eu/rest/v2/all')
        .then((response) => setCountries(response.data))
    
    },[])


    const results = !newQuery ? [] : countries.filter(country => country.name.toLowerCase().includes(newQuery.toLowerCase())) 
    return (
    <div>
        Find countries <input value = {newQuery} onChange = {handleQueryChange}/>
        <Display results = {results}/>
    </div>
        
        
        

    )
}



ReactDOM.render(<App />,document.getElementById('root'))