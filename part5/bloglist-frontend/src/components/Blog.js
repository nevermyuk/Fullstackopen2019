import React,{useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog , setblogs , blogs , notify}) => {
    const [show,setShow] = useState(false)
    const user = JSON.parse(window.localStorage.loggedBlogappUser)


    const toggleShow = (e) => {
      setShow(!show)
    }
    const addLikes = async (e) => {
      e.stopPropagation()
      const response = await blogService.update(blog.id,{...blog, likes: blog.likes+1})
      const oldBlogID = blogs.findIndex(b => b.id === response.id)
      const clonedBlogs = [...blogs]
      clonedBlogs.splice(oldBlogID,1,response)
      setblogs(clonedBlogs)
    }

    const handleDelete = async (e) => {
      e.preventDefault()
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.removeBlog(blog.id)
      const updatedBlog = blogs.filter(b=>b.id!==blog.id)
      setblogs(updatedBlog)
      notify(`${blog.title} by ${blog.author} successfully Deleted!`)

      
      }
      
    }
      
    
    const showWhenClicked = { display: show ? '' : 'none' }




    const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
    <div onClick = {toggleShow}>
    <h2>{blog.title} {blog.author}</h2>
    <div style = {showWhenClicked}>
    <p>{blog.url}</p>
    <p>{blog.likes}<button onClick={addLikes }>Like</button></p>
    <p>Added by {blog.author}</p>
 {(blog.user.username===user.username) && <button onClick = {handleDelete}>Delete this blog</button>}
     </div>
    </div>
    </div>
  )
}

export default Blog