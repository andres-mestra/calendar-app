import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom'
import { startChecking } from '../actions/auth'
import PublicRoute from './PublicRoute'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import PrivateRoute from './PrivateRoute'


export const AppRouter = () => {

  const { checking, uid } = useSelector(state => state.auth)

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch( startChecking() );
  }, [dispatch])

  if( checking ) {
    return (<h5>Loading...</h5>);
  }

  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={CalendarScreen}
            isAuthenticated={ !!uid }
          />
          <PublicRoute
            exact
            path="/login"
            component={LoginScreen}
            isAuthenticated={ !!uid }
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}
