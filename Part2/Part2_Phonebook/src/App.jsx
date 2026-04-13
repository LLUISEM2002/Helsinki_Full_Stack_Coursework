import { useState, useEffect } from 'react'
import contactService from './services/contacts'
import Notification from './components/Notification'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown names: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}


const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => 
          <li key={person.id}>
            {person.name}: {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>
              delete
            </button>
          </li>
        )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.find(person => person.name === newName && person.number === newNumber)) {
      alert(`${newName} with number ${newNumber} is already added to phonebook`)
      return
    }
    else if (persons.find(person => person.name === newName && person.number !== newNumber)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        contactService
          .update(persons.find(person => person.name === newName).id, personObject)
          .then(setSuccess(true))
          .then(setErrorMessage(`Changed ${newName}'s number to ${newNumber}`))
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setSuccess(false)
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setPersons(persons.filter(person => person.name !== newName))
          })
      }
      return
    }
    contactService
      .create(personObject)
      .then(setSuccess(true))
      .then(setErrorMessage(`Added ${newName}`))
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = (id, name) => {
  if (window.confirm(`Delete ${name}?`)) {
    contactService
      .deleteContact(id)
      .then(setErrorMessage(`Deleted ${name} successfully`))
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setSuccess(false)
        setErrorMessage(`Information of ${name} has already been removed from server`)
        setPersons(persons.filter(person => person.id !== id))
      })
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} success={success} />
      <Filter filter={filter} handleFilterChange={(event) => setFilter(event.target.value)} />
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
    
  )
}

export default App