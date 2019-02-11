const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
    
  },
  {
  id: 3,
  name: "Arto Järvinen",
  number: "040-123456"
  
},
{
    id: 4,
  name: "Lea Kutvonen",
  number: "040-123456",
  
},
{
    id: 9,
  name: "Juha Tauriainen",
  number: "09-334456"
}
  
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/info', (req, res) => {
    const x = persons.length
    console.log(Date)
    const date = Date()
    res.json(`Puhelinluettelossa on ${x} henkilöä ${date}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id);

  response.status(204).end();
})


app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    
  if (body.name === undefined) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
  if (body.number === undefined){
    return response.status(400).json({
      error: 'number is missing'
    })
  }
  
  const sameName = persons.filter(p => p.name === body.name)
  const sameNumber = persons.filter(p => p.number === body.number)
  if(sameName.length > 0){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  if(sameNumber.length > 0){
    return response.status(400).json({
      error: 'number must be unique'
    })
  }


  const randomId = Math.floor(Math.random()*100000)
  console.log(randomId)
  const person = {
     id: randomId,
     name: body.name,
     number: body.number
    }
  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})