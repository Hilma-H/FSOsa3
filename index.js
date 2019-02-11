const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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
  const person = request.body
  console.log(person)

  response.json(person)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)