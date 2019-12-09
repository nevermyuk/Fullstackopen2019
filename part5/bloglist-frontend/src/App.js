 
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blogs' 
import loginService from './services/login'
const App = () => {

  const [blogs, setblogs] = useState([]) 
  const [newBlog, setNewBlog] = useState('') 
  const [newAuthor, setNewAuthor] = useState('') 
  const [newURL, setNewURL] = useState('') 
  const [newLike, setNewLike] = useState(0) 
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService
      .getAll()
      .then(initialblogs => setblogs(initialblogs))
  }, [])

  useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
}, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
    />
  )
  
  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }
  const handleLikeChange = (event) => {
    setNewLike(event.target.value)
  }
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      url: newURL,
      author: newAuthor,
      likes: newLike
    }

    blogService
      .create(blogObject)
      .then(data => {
        setblogs(blogs.concat(data))
        setNewBlog('')
        setNewAuthor('')
        setNewURL('')
        setNewLike('')
      })
  }

  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
    <div>
    Title:
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      </div>
     <div> Author:
     <input
        value={newAuthor}
        onChange={handleAuthorChange}
      /> </div>
      <div> URL:
      <input
      value={newURL}
      onChange={handleURLChange}
      /></div>
      <div>Likes 
      <input
      value={newLike}
      onChange={handleLikeChange}
      /></div>
      <button type="submit">Save</button>
    </form>  
  )

  return (
    <div>
      <h1>blogs</h1>

      <Notification message={errorMessage} />

       {user === null ?
        loginForm() :
        <div>
          <p>{user.username} logged in
          <button onClick={handleLogout}>Log Out</button>
          </p>
          <h1>Create new</h1>
          {blogForm()}
          {rows()}
        </div>
      }


      <Footer />
    </div>
  )
}

export default App 