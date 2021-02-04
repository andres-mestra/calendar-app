import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab'
import { eventStartDelete } from '../../../actions/event'

jest.mock('../../../actions/event', () => ({
  eventStartDelete: jest.fn()
}))

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

const initialState = {}
let store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <DeleteEventFab />
  </Provider>
)


describe('Pruebas en <DeleteEventFab />', () => {
  
  test('debe de mostrarse correctamente', () => {
    expect( wrapper ).toMatchSnapshot();
  })

  test('debe de llamar el eventStartDelete al hacer click', () => {
    wrapper.find('button').simulate('click')
    
    expect( eventStartDelete ).toHaveBeenCalled()

  })
  
})
