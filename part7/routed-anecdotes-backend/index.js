const express = require('express')
const app = express()

app.use(express.json())

let blogs = [{
  content: 'If it hurts, do it more often',
  author: 'Jez Humble',
  info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
  votes: 0,
  id: '1'
},
{
  content: 'Premature optimization is the root of all evil',
  author: 'Donald Knuth',
  info: 'http://wiki.c2.com/?PrematureOptimization',
  votes: 0,
  id: '2'
}
]



app.get('/',(req,res) => {
  res.send('<h1>Anecdotes!</h1>')
})

app.get('/blogs',(req,res) => {
  res.json(blogs)
})

app.get('/blogs/:id',(req,res) => {
  const id = req.params.id
  const blog = blogs.find(blog => blog.id === id)
  if (blog) { 
  res.json(blog)
  } else {
    res.status(404).end()
  }
  
})

const generateId = () => {
  const maxId = blogs.length > 0
    ? Math.max(...blogs.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/blogs',(req,res) => {
  const body = req.body
  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  const blog = {
    content: body.content,
    author: body.author,
    info: body.info,
    votes:0,
    id:generateId()
  }

  blogs = blogs.concat(blog)
  res.json(blogs)

})

app.delete('blogs/:id', (req,res) => {
  const id = req.params.id
  const blog = blogs.filter(blog => blog.id !==id)
  res.status(204).end()
})
const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)