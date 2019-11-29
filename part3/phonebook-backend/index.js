require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()



app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('content',  (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content' )
)



app.get('/api/persons',(req,res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id',(req,res) => {
    Person.findbyID(req.params.id).then(person => {
        res.json(person.toJSON())
    })
})
const generateID = () => {
    return Math.floor(Math.random()*(999999999-1)+1);
  }


app.post('/api/persons',(req,res) => {
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
        console.log(res.json(savedPerson.toJSON())
        )
    }).catch(()=>console.log(`FAILED`))

})

app.delete('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    const person = persons.filter(person=> person.id!==id)
    res.status(204).end()
})



app.get('/info',(req,res) => {

    res.send(`Phonebook has info for ${persons.length} people 
    ${Date()}`)

})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`)
})
