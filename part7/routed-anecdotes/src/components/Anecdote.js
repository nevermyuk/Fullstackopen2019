import React from 'react'

const Anecdote = ({ anecdote }) => (
  <div>
  <h1>Anecdote</h1>
  <p>{anecdote.content}</p>
  <p>has {anecdote.votes}</p>
  <p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

export default Anecdote