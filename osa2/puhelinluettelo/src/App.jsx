import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

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
      <div key={person.id}>{person.name} {person.number} <button onClick={() => props.removePerson(person.id)}>delete</button></div>  
    )}
  </div>
)

const Message = (props) => {
  if (props.message === null) {
    return null
  }
  
  return(
  <div className={props.class}>
    {props.message}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState()
  const [messageClass, setMessageClass] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const handeNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const messageShownSeconds = 3000;

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.filter((person) => person.name === personObject.name).length > 0) {
      if(window.confirm(`${newName} is already added to phonebook. Replace the old number with the new one?`)) { 
        const person = persons.find(p => p.name === personObject.name);
        const changedPerson = {...person, number: newNumber}
        const id = person.id
        personService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setMessageClass('success-message')
            setMessage(`${returnedPerson.name} updated`)
            setTimeout(() => {
                setMessage(null)
                setMessageClass('')
            }, messageShownSeconds)
            setPersons(personsToShow.map(p => p.id !== id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
            setMessageClass('success-message')
            setMessage(`${returnedPerson.name} added`)
            setTimeout(() => {
              setMessage(null)
              setMessageClass('')
            }, messageShownSeconds)
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
        });
    }
  }

  const removePerson = (id) => {
    console.log(id)
    const person = persons.find(p => p.id === id); 
    if(window.confirm(`Delete ${person.name}?`)){
      personService
        .remove(id)
        .then(returnedPerson => {
          setMessageClass('success-message')
          setMessage(`${returnedPerson.name} removed`)
          setTimeout(() => {
            setMessage(null)
            setMessageClass('')
          }, messageShownSeconds)
          setPersons(personsToShow.filter(person => person.id !== id))
        })
        .catch(error => {
          setMessageClass('error-message')
          setMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
            setMessageClass('')
          }, messageShownSeconds)
          setPersons(personsToShow.filter(p => p.id !== id))
        })
    }
  }

  const personsToShow = nameFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(nameFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} class={messageClass} />
      <Filter filterValue={nameFilter} handleFilterChange={handleFilterChange} />
      
      <h2>Add new</h2>
      <PersonForm formSubmit={addPerson} nameValue={newName} handeNameChange={handeNameChange} numberValue={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  )

}

export default App