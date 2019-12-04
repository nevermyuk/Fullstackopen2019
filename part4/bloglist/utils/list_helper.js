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


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}

