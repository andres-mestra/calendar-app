import * as React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { NavBar } from '../ui/NavBar'
import { messages } from '../helpers/calendar-message'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import { CalendarEvent } from './CalendarEvent'

moment.locale('es')

const localizer = momentLocalizer(moment)
const events = [{
  title: 'Cumpleaños del jefe',
  start: moment().toDate(), //New Date()
  end: moment().add(2, 'hours').toDate(),
  bgColor: '#fafafa',
  notes: 'comprar juego',
  user:{
    _id:'1234',
    name:'Andres'
  }
}]

export const CalendarScreen = () => {

  const onDoubleClick = (e) => {
    console.log(e)
  }
  
  const onSelectEvent = (e) => {
    console.log(e)
  }
  
  const onViewChange = (e) => {
    localStorage.setItem('lastView', e );
  }
  
  
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style =  {
      backgroundColor:'#367CF7',
      borderRadius:'0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }

    return {
      style
    }
  }

  return (
    <div className="calendar-screen">
      <NavBar />
      <Calendar
        localizer={localizer}
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter={ eventStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelectEvent }
        onView={ onViewChange }
        components={{
          event:CalendarEvent
        }}
      />
    </div>
  )
}
