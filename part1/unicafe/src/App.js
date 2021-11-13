import React, { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = (props) => {

  const total = props.stats.good + props.stats.bad + props.stats.neutral
  const average = props.stats.good + props.stats.neutral + props.stats.bad / 3
  const positive = (props.stats.good / total)  * 100 

  if(total === 0) {
    return(
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <StatisticsLine text='Good' stat={props.stats.good}/>
      <StatisticsLine text='Neutral' stat={props.stats.neutral}/>
      <StatisticsLine text='Bad' stat={props.stats.bad}/>
      <StatisticsLine text='Total' stat={total}/>
      <StatisticsLine text='Average'stat={average}/>
      <StatisticsLine text='Positive' stat={positive}/>
    </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <p>{props.text}: {props.stat}</p>
  )
}

const App = () => {
  const [ feedback, setFeedback ] = useState({
    good: 0, neutral: 0, bad: 0,
  })

  const handleSetGood = () => {
    setFeedback({
      ...feedback,
      good: feedback.good + 1,
    })
  }

  const handleSetNeutral = () => {
    setFeedback({
      ...feedback,
      neutral: feedback.neutral + 1,
    })
  }

  const handleSetBad = () => {
    setFeedback({
      ...feedback,
      bad: feedback.bad + 1
    })
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleSetGood} text='Good'/>
      <Button onClick={handleSetNeutral} text='Neutral'/>
      <Button onClick={handleSetBad} text='Bad'/>

      <h1>Statistics</h1>
      <Statistics stats={feedback}/>
    </div>
  )
}
export default App