const Header = (props) => {
  console.log(props)
  return (
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      {props.part} {props.exercises}
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      {props.parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      Number of exercises {props.exercises.reduce((sum, i) => sum + i.exercises, 0)}
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises={parts} />
    </div>
  )
}

export default App