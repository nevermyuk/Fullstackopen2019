import React from 'react'

const Notification = ({message}) => {
  return ( 
    message ? <div>{message}</div>:null
  )
}

export default Notification