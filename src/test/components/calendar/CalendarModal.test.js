import React from 'react'
import { act } from 'react-dom/test-utils'
import moment from 'moment'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventClearActiveEvent, eventStartUpdate } from '../../../actions/event'


jest.mock('../../../actions/event', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
})) 

Storage.prototype.setItem = jest.fn()

const middleware = [ thunk ];
const mockStore = configureStore(middleware);


const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlusOne = now.clone().add(1, 'hours');
const initialState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'hola mundo',
      notes: 'algunas notas',
      start: now.toDate(),
      end: nowPlusOne.toDate()
    },
  },
  auth: {
    name: 'test',
    uid: '123'
  },
  ui: {
    modalOpen: true
  }
}
let store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <CalendarModal />
  </Provider>
)

describe('Pruebas en <CalendarModal />', () => {

  beforeEach( () => {
    jest.clearAllMocks()
  })
  
  test('debe de mostrar el modal', () => {
    expect( wrapper.find('Modal').prop('isOpen') ).toBe(true)
  })

  test('debe de llamar la acción de actualizar  y cerrar el modal', () => {
    
    act(() => {
      wrapper.find('form').prop('onSubmit')({
        preventDefault(){}
      })
    })
    
    expect( eventStartUpdate ).toHaveBeenCalledWith( initialState.calendar.activeEvent )
    expect( eventClearActiveEvent ).toHaveBeenCalled()
  })

  test('debe de mostrar error si falta el titulo', () => {
    
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: '',
      }
    })
    act(() => {
      wrapper.find('form').prop('onSubmit')({
        preventDefault(){}
      })
    })
    
    expect( eventStartUpdate ).not.toHaveBeenCalled()
    expect(wrapper.find('input[name="title"]').html().includes('is-invalid')).toBe(true)

  })
  
  
  
})
