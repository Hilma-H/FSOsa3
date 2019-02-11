const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://full_stack:${password}@cluster0-qi0xb.mongodb.net/phonebook?retryWrites=true`
mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length<4){
    Person.find({}).then(result => {
      console.log('Puhelinluettelo: ')
    result.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })
}
if (process.argv.length >3){
    person.save().then(response => {
      console.log(`Lisättiin ${person.name} ${person.number} luetteloon`);
    mongoose.connection.close();
})
}

