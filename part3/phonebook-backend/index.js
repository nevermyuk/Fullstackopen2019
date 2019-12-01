
const express = require('express')
const app = express()
require('dotenv').config()
const Person = require('./models/person')


const morgan = require('morgan')

app.use(express.json())
const cors = require('cors')




app.use(express.static('build'))
app.use(cors())

morgan.token('content',  (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content' )
)



app.get('/api/persons',(req,res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id',(req,res,next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))

})


app.post('/api/persons',(req,res,next) => {
  const body = req.body

  const person = new Person ({
    name : body.name,
    number : body.number,
  })

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id',(req,res,next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})



app.get('/info',(req,res) => {
  Person.countDocuments({},(err,count) => {
    res.send(`Phonebook has info for ${count} people 
        ${Date()}`)
  })


})

app.put('/api/persons/:id', (req,res,next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id,person,{ new: true, runValidators: true, context: 'query'  })
    .then(updatedPerson => updatedPerson.toJSON())
    .then(updatedPersonAndFormatted => {
      res.json(updatedPersonAndFormatted)
    })
    .catch(error => next(error))
})




const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// handler of requests with unknown endpoint


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
// handler of requests with result to errors

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})
