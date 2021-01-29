import moment from 'moment'
import { types } from '../types/types';


const initialState = {
  events:[{
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


export const calendarReducer = ( state = initialState, action ) => {
  switch (action?.type) {

    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      }

    case (types.eventAddNew):
      return {
        ...state,
        events:[ action.payload, ...state.events ]
      }
  
    default:
      return  state;
  }
}
