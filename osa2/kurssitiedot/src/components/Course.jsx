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


const Course = ({ course }) => {
    return (
        <div>
          <Header course={ course } />
          <Content parts={ course.parts } /> 
        </div>
      );
}

export default Course;