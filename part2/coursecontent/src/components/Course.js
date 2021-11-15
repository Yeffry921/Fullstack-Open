const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <ul>
      {parts.map((part) => 
        <li key={part.id}>{part.name} {part.exercises}</li>
      )}
    </ul>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </div>
    
  )
}

export default Course