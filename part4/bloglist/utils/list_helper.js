const dummy = (blogs) => 1
//Receives an array of blogs and return 1



const totalLikes = (blogs) => {
// Returns total likes of blogs
  const reducer = (totalLikes,blog) => blog.likes+totalLikes
  return blogs.reduce(reducer,0)
}
module.exports = {
  dummy,
  totalLikes
}