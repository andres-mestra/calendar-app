import moment from 'moment'
import { types } from '../types/types';


const initialState = {
  events: [{
    id: new Date().getTime(),
    title: 'Cumpleaños del jefe',
    start: moment().toDate(), //New Date()
    end: moment().add(2, 'hours').toDate(),
    bgColor: '#fafafa',
    notes: 'comprar juego',
    user: {
      _id: '1234',
      name: 'Andres'
    }
  }],
  activeEvent: null
}


export const calendarReducer = (state = initialState, action) => {
  switch (action?.type) {

    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      }

    case (types.eventAddNew):
      return {
        ...state,
        events: [action.payload, ...state.events]
      }
    case (types.eventClearActiveEvent):
      return {
        ...state,
        activeEvent: null
      }

    case (types.eventUpdated):
      return {
        ...state,
        events: state.events.map(e => (e.id === action?.payload.id) ? action.payload : e)
      }

    case (types.eventDeleted):
      return {
        ...state,
        events: state.events.filter( 
          e => ( e.id !== state?.activeEvent.id )
        ),
        activeEvent: null,
      }

    default:
      return state;
  }
}
