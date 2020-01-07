import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({anecdotes,addVote,setNotification}) => {

 const vote = (anecdote) => {
    addVote(anecdote.id)
    setNotification(`Voted for ${anecdote.content}`)
    setTimeout(() =>  {
      setNotification(null)},5000
    )
  }

  return (
  <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>)
}
const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}
const mapDispatchtoProps = {addVote,setNotification}
const ConnectedAnecdotes = connect(mapStateToProps,mapDispatchtoProps)(AnecdoteList)
export default ConnectedAnecdotes

