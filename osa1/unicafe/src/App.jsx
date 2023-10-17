import { useState } from 'react'


const Button = (props) => {
  return (
    <button onClick={ props.handleClick }>
      { props.text }
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{ props.text }</td> 
      <td>{ props.value }</td>
    </tr>
  );
}

const Statistics = ({ stats }) => {
  const good = stats.good;
  const bad = stats.bad;
  const neutral = stats.neutral;
  const total = stats.total;
  const average = stats.average;
  const percentOfGood = stats.percentOfGood;
  
  if (total > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={ good } />
          <StatisticLine text="neutral" value={ neutral } />
          <StatisticLine text="bad" value={ bad } />
          <StatisticLine text="total" value={ total } />
          <StatisticLine text="average" value={ average } />
          <StatisticLine text="positive" value={ percentOfGood + " %"} />
        </tbody>
      </table>
    );
  }
  return (
    <div>
      No feedback given.
    </div>
  );
}

const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal ]= useState(0);
  const [average, setAverage] = useState(0);
  const [percentOfGood, setPercent] = useState(0)

  const increaseGood = () => {
    const newTotal = total + 1;
    const newGood = good + 1;
    const points = newGood * 1 + bad * (-1);
    setTotal(newTotal);
    setGood(newGood);
    setAverage(points/newTotal);
    setPercent(newGood/newTotal*100);
  }

  const increaseNeutral = () => {
    const newTotal = total + 1;
    const points = good * 1 + bad * (-1);
    setTotal(newTotal);
    setNeutral(neutral + 1);
    setAverage(points/newTotal);
    setPercent(good/newTotal*100)
  }

  const increaseBad = () => { 
    const newTotal = total + 1;
    const newBad = bad + 1;
    const points = good * 1 + newBad * (-1);
    setTotal(newTotal)
    setBad(newBad);
    setAverage(points/newTotal);
    setPercent(good/newTotal*100)
  }

  const stats = {
    good: good,
    bad: bad,
    neutral: neutral,
    total: total,
    average: average,
    percentOfGood: percentOfGood
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text="Good" />
      <Button handleClick={increaseNeutral} text="Neutral" />
      <Button handleClick={increaseBad} text="Bad" />
      <h1>statistics</h1>
      <div>
        <Statistics stats={stats}  />
      </div>
    </div>
  )
}

export default App
