import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({vote,anecdotes}) => {
    const largest = Object.keys(vote).find(key => vote[key] === Math.max(...vote)) // Finding key by its value!
    return (
        <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[largest]}</p>
        </div>
    )

}




const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(6).fill(0))

  const setToNext = () => setSelected(Math.round(Math.random()*5))

  const addVote = () => {
      const newVote =  [...vote]
      newVote[selected] += 1
      setVote(newVote)
  } 



  return (
    <div>
    <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
    <br></br>
    <p>has {vote[selected]} votes</p>
    <button onClick={addVote}>Vote</button>
    <button onClick={setToNext}>Next anecdote</button>
    <Display vote = {vote} anecdotes = {anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)