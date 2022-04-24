import React,{Fragment} from 'react'

const GuestHome = () => {

  return (
        <Fragment>
        <h2>You are not logged in. Please log in or sign up first</h2>
        <br/>
        <a href="/login"><h1>Log In</h1></a>
        <a href="/signup"><h1>Sign Up</h1></a>
      </Fragment>
  )
}

export default GuestHome;