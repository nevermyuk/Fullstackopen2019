
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
        response.status(404).end()
        }
    })
    .catch(error => next(error))

})


app.post('/api/persons',(req,res,next) => {
    const body = req.body
    if (!body.name || !body.number ) {
        return res.status(400).json({
            error: 'Name or number is missing'
        })
    } 
    // if (Person.some(person => person.name === body.name)) {
    //     return res.status(400).json({
    //         error:'Name must be unique'
    //     })
    // }
    // if (Person.some(person => person.number === body.number)) {
    //     return res.status(400).json({
    //         error:'Number must be unique'
    //     })
    // }

    const person = new Person ({
        name : body.name,
        number : body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
})

app.delete('/api/persons/:id',(req,res) => {
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

    Person.findByIdAndUpdate(req.params.id,person,{ new: true })
    .then(updatedPerson => {
        res.json(updatedPerson.toJSON())
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
    } 

next(error)
}
// handler of requests with result to errors

app.use(errorHandler) 

const PORT = process.env.PORT
app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`)
})
