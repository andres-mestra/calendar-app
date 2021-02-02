import * as React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'


export default function PrivateRoute({
  isAuthenticated,
  component: Component,
  ...rest
}) {
  return (
    <Route 
      {...rest}
      component={(props) => (
        (isAuthenticated) ? (<Component {...props} />) : (<Redirect to="/login" />)
      )}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}