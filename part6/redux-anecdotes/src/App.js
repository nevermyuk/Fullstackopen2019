import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notifications from './components/Notification'
import anecdoteService from './services/anecdotes'
import {initializeAnecdote} from './reducers/anecdoteReducer'


const App = (props) => {
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => props.initializeAnecdote(anecdotes))
  },[])



  return (
    <div>
        <Notifications />
        <Anecdotes />
        <AnecdoteForm />

    </div>
  )
}

export default connect(null,{initializeAnecdote})(App)