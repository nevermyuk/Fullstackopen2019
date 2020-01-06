import React from 'react'

const NewAnecdote = (props) => {
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
      <form onSubmit={addAnecdote}>
      <h2>Create New</h2>
        <div><input name ='title'/></div>
        <button type='submit'>create</button>
      </form>
  )

}

export default NewAnecdote


