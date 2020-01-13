import React from 'react'
import store from './store'

import Menu from './components/Menu'
import About from './components/About'

import Notification from './components/Notification'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'

import Footer from './components/Footer'



import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import AnecdoteForm from './components/AnecdoteForm'

const App = () => {

 
  const {anecdotes,notification} = store.getState()

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    /*(anecdotes.map(a => a.id === id ? voted : a))*/
  } 

  return (
    <Router>
    <div>
      <Notification message={notification} />
      <h1>Software anecdotes</h1>
      <Menu />
      <Footer />
    </div>
      <Route exact path="/" render ={() => <AnecdoteList anecdotes={anecdotes} /> }/>
      <Route exact path="/about" render ={() => <About /> }/>
      <Route exact path="/create" render ={() => <AnecdoteForm /> }/>
      <Route exact path ="/anecdotes" render ={() => <AnecdoteList anecdotes={anecdotes} />} />
      <Route exact path ="/anecdotes/:id" render ={({match}) =>  <Anecdote anecdote={anecdoteById(match.params.id)} />} />
    </Router>
  )
}

export default App;