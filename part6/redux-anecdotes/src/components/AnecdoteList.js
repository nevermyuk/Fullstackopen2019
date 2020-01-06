import React from 'react'

const Anecdotes = (props) => {
 const anecdotes = props.store.getState()
 const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch({
      type: 'ADD_VOTE',
      data: id 
    })
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
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </div>)
}

export default Anecdotes
