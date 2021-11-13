import React, { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = (props) => {
  return (
    <p>{props.text}: {props.stat}</p>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  const total = good + neutral + bad
  const average = good + neutral + bad / 3
  const positive = (good / total)  * 100

  
  const handleSetGood = () => {
    setGood(good + 1)
  }

  const handleSetNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleSetBad = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleSetGood} text='Good'/>
      <Button onClick={handleSetNeutral} text='Neutral'/>
      <Button onClick={handleSetBad} text='Bad'/>

      <h1>Statistics</h1>
      <Statistics text='Good' stat={good}/>
      <Statistics text='Neutral' stat={neutral}/>
      <Statistics text='Bad' stat={bad}/>
      <Statistics text='Total' stat={total}/>
      <Statistics text='Average' stat={average}/>
      <Statistics text='Positive' stat={positive}/>
    </div>
  )
}
export default App