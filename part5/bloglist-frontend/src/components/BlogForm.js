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