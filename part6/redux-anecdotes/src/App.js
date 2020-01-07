import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notifications from './components/Notification'


const App = (props) => {



  return (
    <div>
        <Notifications />
        <Anecdotes />
        <AnecdoteForm />

    </div>
  )
}

export default App