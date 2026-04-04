import { useState } from 'react'

const Heading = (props) => <h1>{props.text}</h1>

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
const StatisticsLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td><td>{props.symbol}</td></tr>

const Statistics = (props) => {
  const { good, neutral, bad } = props

  return(
    <>
      <StatisticsLine text="All" value={good + neutral + bad} symbol="" />
      <StatisticsLine text="Average" value={(good - bad) / (good + neutral + bad)} symbol="" /> 
      <StatisticsLine text="Positive" value={good / (good + neutral + bad) * 100} symbol="%" />
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Heading text="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Heading text="statistics" />

      { (good !== 0 || neutral !== 0 || bad !== 0) 
        ? (
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <Statistics good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
      )
        : <p>No feedback given (👉ﾟヮﾟ)👉</p>
      }
    </>

  )
}

export default App