const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('content',  (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content' )
)


let persons = [
    {
        "name": "Arto Hellas",
        "number": "39-44-5323523",
        "id": 1
    },
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
    },
    {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
    }
      
]

app.get('/api/persons',(req,res) => {
    console.log(persons)
    res.json(persons)
})

app.get('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person=> person.id===id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
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
    if (persons.some(person => person.name === body.name)) {
        return res.status(400).json({
            error:'Name must be unique'
        })
    }
    if (persons.some(person => person.number === body.number)) {
        return res.status(400).json({
            error:'Number must be unique'
        })
    }

    const person = {
        name : body.name,
        number : body.number,
        id: generateID()
    }

    persons = persons.concat(person)

    res.json(persons)
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


const PORT = process.env.PORT || 3001
app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`)
})
