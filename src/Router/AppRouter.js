import * as React from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { startChecking } from '../actions/auth'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'

export const AppRouter = () => {

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch( startChecking() );
  }, [dispatch])

  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={CalendarScreen}
          />
          <Route
            exact
            path="/login"
            component={LoginScreen}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}
