import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = ({store}) => {

 const anecdotes = store.getState().anecdotes
 const vote = (anecdote) => {
    store.dispatch(addVote(anecdote.id))
    store.dispatch(setNotification(`Voted for ${anecdote.content}`))
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

export default Anecdotes
