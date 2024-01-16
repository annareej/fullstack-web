const Header = ({ course }) => {
  return (
    <h1>{ course.name }</h1>
  );
}

const Part = (props) => {
  return (
    <p>{ props.part } { props.exercise }</p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={ part.id} part={ part.name } exercise={ part.exercises } />
      )}
    </div>
  );  
}

const Total = ({ parts }) => {
  const total = parts.reduce( (sum, part) => {
    return sum + part.exercises
  }, 0);

  return (
    <h4>total of { total } exercises</h4>
  );
}

const Course = ({ course }) => {
    return (
        <div>
          <Header course={ course } />
          <Content parts={ course.parts } />
          <Total parts={ course.parts } />
        </div>
      );
}

export default Course;