import { useState } from 'react'

const Heading = (props) => <h1>{props.text}</h1>

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
const Print = (props) => <div>{props.text} {props.value} {props.symbol}</div>

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  return(
    <div>
      <Print text="All" value={good + neutral + bad} symbol="" />
      <Print text="Average" value={(good - bad) / (good + neutral + bad)} symbol="" /> 
      <Print text="Positive" value={good / (good + neutral + bad) * 100} symbol="%" />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Heading text="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Print text="good" value={good} />
      <Print text="neutral" value={neutral} />
      <Print text="bad" value={bad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )
}

export default App