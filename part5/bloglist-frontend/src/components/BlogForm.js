import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  newBlog,
  newAuthor,
  newURL,
  handleAuthorChange,
  handleBlogChange,
  handleURLChange,
  addBlog }) => (
  <form onSubmit={addBlog}>
    <div>
  Title:
      <input
        {...newBlog}
      />
    </div>
    <div> Author:
      <input
        {...newAuthor}
      /> </div>
    <div> URL:
      <input
        {...newURL}

      /></div>
    <button type="submit">Add</button>
  </form>
)
BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleURLChange: PropTypes.func.isRequired,
  handleBlogChange: PropTypes.func.isRequired,
  newBlog: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newURL: PropTypes.string.isRequired
}
export default BlogForm