 
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blogs' 
import loginService from './services/login'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {

  const [blogs, setblogs] = useState([]) 
  const [newBlog, setNewBlog] = useState('') 
  const [newAuthor, setNewAuthor] = useState('') 
  const [newURL, setNewURL] = useState('') 
  const [notification, setNotification] = useState({message:null})
 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  

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
      notify('Wrong username or password','error')
  
    }
  }

  const rows = () => blogs.sort((a,b)=>b.likes-a.likes).map(blog =>
    <Blog
      setblogs = {setblogs}
      blogs = {blogs}
      key={blog.id}
      blog={blog}
      notify={notify}
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

  const addBlog = async(event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      url: newURL,
      author: newAuthor
    }
    try {
    const response = await blogService.create(blogObject)
        setblogs(blogs.concat(response))
        setNewBlog('')
        setNewAuthor('')
        setNewURL('')
        notify(`${blogObject.title} by ${blogObject.author} added`)
    } catch {
      notify('Failed, Something went wrong')
    }
  }
  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 10000)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

 

  

  return (
    <div>
      <h1>blogs</h1>

      <Notification notification={notification} />

       {user === null ?
        loginForm() :
        <div>
          <p>{user.username} logged in
          <button onClick={handleLogout}>Log Out</button>
          </p>
          <h1>Create new</h1>
          <Togglable buttonLabel="Create">
  <BlogForm
    addBlog={addBlog}
    newBlog={newBlog}
    newAuthor={newAuthor}
    newURL={newURL}
    handleBlogChange={handleBlogChange}
    handleAuthorChange={handleAuthorChange}
    handleURLChange={handleURLChange}
  />
</Togglable>
          {rows()}
        </div>
      }


      <Footer />
    </div>
  )
}

export default App 