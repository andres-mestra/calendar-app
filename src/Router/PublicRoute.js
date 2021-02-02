import * as React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'


export default function PublicRoute({
  isAuthenticated,
  component: Component,
  ...rest
}) {
  return (
    <Route 
      {...rest}
      component={(props) => (
        (isAuthenticated) ? (<Redirect to="/" />) : (<Component {...props} />) 
      )}
    />
  )
}

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}