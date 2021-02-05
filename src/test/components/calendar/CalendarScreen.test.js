import React from 'react'
import {act} from 'react-dom/test-utils';
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { CalendarScreen } from '../../../components/calendar/CalendarScreen'
import { messages } from '../../../helpers/calendar-message'
import { types } from '../../../types/types'
import { eventSetActive } from '../../../actions/event'

jest.mock('../../../actions/event', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}))

Storage.prototype.setItem = jest.fn()

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

const initialState = {
  calendar: {
    events: [],
    activeEvent: null,
  },
  auth: {
    name: 'test',
    uid: '123'
  },
  ui: {
    modalOpen: false
  }
}
let store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <CalendarScreen />
  </Provider>
)


describe('Pruebas en <CalendarScreen />', () => {
  
  test('debe de mostrarse correctamente', () => {
    expect( wrapper.find('Calendar').exists() ).toBe(true)
  })

  test('Pruebas con las interacciones del calendario.', () => {
    const calendar = wrapper.find('Calendar');

    const calendarMessages = calendar.prop('messages')
    expect(calendarMessages).toEqual( messages )

    calendar.prop('onDoubleClickEvent')();
    expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal })

    calendar.prop('onSelectEvent')({start: 'hola'});
    expect( eventSetActive ).toHaveBeenCalledWith({start: 'hola'})
    
    act(() => {
      calendar.prop('onView')('week')
    })
    expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week')

  })
  
  
})
