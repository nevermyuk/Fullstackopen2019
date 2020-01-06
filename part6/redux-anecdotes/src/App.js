import React from 'react';

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch({
      type: 'ADD_VOTE',
      data: id })
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.title.value
    props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data : content
    })
    event.target.title.value = ''
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name ='title'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App