import React from 'react'

const courses = [
  {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }, 
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

const Course = () =>{

 const [half,node] = courses

 const Header = ({content}) => <h1>{content.name}</h1>

 const Content = ({content}) => (content.parts.map(part => <p key= {part.id}> {part.name} {part.exercises}</p>))

 const Sum = ({content}) => {
  let total = (content.parts.reduce(((sum,part) => sum + part.exercises), 0 ))
  return (
    <p><strong>total of {total} exercises</strong></p>
  )  


}
 return (
   <div>
    <Header content={half}/>
    <Content content={half}/>
    <Sum content={half}/>
    <Header content={node}/>
    <Content content={node}/>
    <Sum content={node}/>

  </div>
 )


}



export default Course