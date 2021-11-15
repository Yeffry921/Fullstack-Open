const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <div>
      {parts.map((part) => 
        <p key={part.id}>{part.name} {part.exercises}</p>
      )}
    </div>
  )
}


const Total = ({ parts }) => {
  const total = parts.reduce((acc, curr) => {
    return curr.exercises + acc
  }, 0)

  return (
    <p>Total number of exercises {total}</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
    
  )
}

export default Course