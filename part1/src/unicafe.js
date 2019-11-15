import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick,text}) => <button onClick = {onClick}>{text}</button>

const Statistic = ({text,value}) => {
 return  (<tr>
          <td>{text}</td> 
          <td>{value}</td>
          </tr>
          )
}
const Statistics = ({stats}) => {
  if (stats.total > 0) {
      return (
      <table>
      <tbody>
      <Statistic text = 'Good' value = {stats.good} />
      <Statistic text = 'Neutral' value = {stats.neutral}/>
      <Statistic text = 'Bad' value = {stats.bad} />
      <Statistic text = 'All' value = {stats.total}/>
      <Statistic text = 'Average' value = {((stats.good-stats.bad)/stats.total)}/>
      <Statistic text = 'Positive' value = {((stats.good/stats.total)*100) + "%"}/>
      </tbody>
      </table>
      )
    }
  return (<p>No FeedBack Given</p>)


}

const App = () => {
  // save clicks of each button to own state
  const [all,setAll] = useState({good: 0 , neutral : 0 , bad : 0 , total : 0})

  const handleGood = () => {
    setAll({...all, total: all.total + 1 , good: all.good + 1})

  }
  const handleNeutral = () => {
    setAll({...all, total: all.total + 1 , neutral: all.neutral + 1})
  }
  const handleBad = () => {
    setAll({...all, total: all.total + 1 , bad: all.bad + 1})
  }


  return (
    <div>
    <h1>Give Feedback</h1>
     <Button onClick = {handleGood} text= 'good'/>
     <Button onClick = {handleNeutral} text= 'neutral'/>
     <Button onClick = {handleBad} text= 'bad'/>
     <h1>Statistics</h1>
    <Statistics stats = {all} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)