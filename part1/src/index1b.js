import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content= (props) => { 

    return (
        <div>
        <Part name = {props.parts[0].name} exercise = {props.parts[0].exercises}/>
        <Part name = {props.parts[1].name} exercise = {props.parts[1].exercises}/>
        <Part name = {props.parts[2].name} exercise = {props.parts[2].exercises}/>
        </div>
    )
}
    


const Part = (props) => {
    return (
        <p>{props.name} {props.exercise}</p>
    )
}

const Total = (props) => {
    let sum = 0
    props.parts.forEach(element => {
        sum += element.exercises
    })

    return (
        <p>Number of exercises {sum}</p>
    )
}






const App = () => {
  const course =  {
    name: 'Half Stack application development',
    parts : [
    {
    name: 'Fundamentals of React',
    exercises: 10
    },
    {
    name: 'Using props to pass data',
    exercises: 7
    }, 
    {
    name: 'State of a component',
    exercises: 14
    }
    ]
    }

  return (
    <div>
        <Header course = {course.name} />
        <Content parts = {course.parts}/>
        <Total parts = {course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))