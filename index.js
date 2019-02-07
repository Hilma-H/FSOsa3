const express = require('express')
const app = express()

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

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)