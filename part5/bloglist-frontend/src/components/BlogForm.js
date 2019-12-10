import React from 'react'

const BlogForm = ({newBlog,newAuthor,newURL,handleAuthorChange,handleBlogChange,handleURLChange,addBlog}) => (
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
    <button type="submit">Add</button>
  </form>  
)

export default BlogForm