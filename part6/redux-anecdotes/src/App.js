import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notifications from './components/Notification'
import {initializeAnecdote} from './reducers/anecdoteReducer'


const App = (props) => {
  useEffect(() => {
    props.initializeAnecdote()
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