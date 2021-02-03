import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { NavBar } from '../ui/NavBar'
import { messages } from '../../helpers/calendar-message'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/event'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

moment.locale('es')

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {

  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar)   

  const [lastView, setLastView] = React.useState(
    localStorage.getItem('lastView') || 'month'
  )

  React.useEffect(() => {
    dispatch( eventStartLoading() )
    
  }, [dispatch])

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }


  const onSelectSlot = (e) => {
    //Este metodo recibe la celda donde el usuario hizo click
    //console.log(e)
    dispatch( eventClearActiveEvent() )
  }
  


  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
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
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot= { onSelectSlot }
        onView={onViewChange}
        selectable={ true }
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
      />

      <AddNewFab />
      { ( activeEvent ) && <DeleteEventFab /> }
      <CalendarModal />
      
    </div>
  )
}
