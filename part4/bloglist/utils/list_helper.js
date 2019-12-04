let _ = require('lodash')

const dummy = (blogs) => 1
//Receives an array of blogs and return 1



const totalLikes = (blogs) => {
// Returns total likes of blogs
  const reducer = (totalLikes,blog) => blog.likes+totalLikes
  return blogs.reduce(reducer,0)
}

/* favouriteBlog function finds out which blog has most likes.
If there are many top favorites,
it is enough to return one of them.*/
const favouriteBlog = (blogs) => {
  const mostLikedNumber = Math.max(...blogs.map(blog => blog.likes))
  const mostLikedBlog = blogs.find(blog => blog.likes === mostLikedNumber)
  return mostLikedBlog
}

const mostBlogs = (blogs) => {
  const nameArray = blogs.map(blog => blog.author) //create an array of name values from blogs
  const authorBlogCount = _.countBy(nameArray) // Object with key:value pair of author occurence
  const blogCount = _.max(Object.values(authorBlogCount)) // find KV pair with highest value
  const author = Object.keys(authorBlogCount).find(key => authorBlogCount[key] === blogCount) // Use value to find key
  const mostBlog = { author:author, blogs:blogCount }
  return mostBlog
}

const mostLikes = (blogs) => {
    // Author with highest likes
    const likesArray = blogs.map(blog => blog.likes)
    const highestLikes = _.max(likesArray)
    const mostLikedAuthor = blogs.find(blog => blog.likes === highestLikes).author
    // Author total likes
    const mostLikedAuthorBlogs = blogs.filter(blog => blog.author === mostLikedAuthor)
    const reducer = (totalLikes,blog) => blog.likes+totalLikes
    const totalLikes = mostLikedAuthorBlogs.reduce(reducer,0)
        

    return { author:mostLikedAuthor,likes:totalLikes }
  }

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}

