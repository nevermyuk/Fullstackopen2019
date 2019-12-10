import React,{useState,useEffect} from 'react'
import blogService from '../services/blogs'
import blogs from '../services/blogs'

const Blog = ({ blog , setblogs , blogs}) => {
    const [show,setShow] = useState(false)


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
      </div>
    </div>
    </div>
  )
}

export default Blog