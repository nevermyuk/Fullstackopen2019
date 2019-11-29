const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log(`give password as argument`);
    process.exit(1)
}


const password = process.argv[2]


mongoose.connect(url, {useNewUrlParser:true})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Person = mongoose.model('Person', personSchema)

const person = new Person ({
    name : process.argv[3],
    number: process.argv[4]
})


if (process.argv.length >= 3) {
    const password = process.argv[2]
    if (process.argv.length===3){
        Person.find({}).then(result => {
            console.log(`phonebook:`);
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            })
            mongoose.connection.close()
        })
    }
    else if (process.argv.length===5) {
        person.save().then(response => {
            console.log(`Added ${response.name} number ${response.number} to phonebook`);
            mongoose.connection.close()
        })
    }
    else {
        console.log(`Too many arguments...`);
        mongoose.connection.close()
    }
}




