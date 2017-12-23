import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => {
	return (
      <div className='error-template'>
        <h1>Oops!</h1>
        <p className="zoom-area">The <b>Page</b> was not found. </p>
        <section className="error-container">
          <span><span>4</span></span>
          <span>0</span>
          <span><span>4</span></span>
        </section>
        <div className="link-container">
      		<Link className="more-link" to="/">Take Me Home</Link>
        </div>
      </div>
    )
}

export default NoMatch