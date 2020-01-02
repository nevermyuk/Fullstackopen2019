import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="title">
      {blog.title}
    </div>
    <div className="author">
      {blog.author}
    </div>
    <div>
      <p className="likes">blog has {blog.likes} likes </p>
     <button onClick={onClick}>like</button>

    </div>
  </div>
)

export default SimpleBlog