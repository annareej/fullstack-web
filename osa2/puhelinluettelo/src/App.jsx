import { useState } from 'react'

const Filter = (props) => (
  <div>
    filter shown with <input value={props.filterValue} onChange={props.handleFilterChange} />
  </div>
)

const PersonForm = (props) => (
  <form onSubmit={props.formSubmit}>
        <div>
          name: 
          <input 
            value={props.nameValue} 
            onChange={props.handeNameChange}
          />
        </div>
        <div>
          number: 
          <input 
            value={props.numberValue}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

const Persons = (props) => (
  <div>
    {props.persons.map(person => 
      <div key={person.name}>{person.name} {person.number}</div>  
    )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const handeNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.filter((person) => person.name === personObject.name).length > 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = nameFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(nameFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={nameFilter} handleFilterChange={handleFilterChange} />
      
      <h2>Add new</h2>
      <PersonForm formSubmit={addPerson} nameValue={newName} handeNameChange={handeNameChange} numberValue={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )

}

export default App