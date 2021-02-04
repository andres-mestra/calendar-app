import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { AppRouter } from '../../Router/AppRouter'


const middleware = [ thunk ];
const mockStore = configureStore(middleware);

//store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
  
  test('debe de mostrar el espere.', () => {

    const initialState = {
      auth:{
        checking: true
      }
    }
    let store = mockStore( initialState );
    
    const wrapper = mount(
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    )
    expect( wrapper ).toMatchSnapshot()
  })

  test('debe de mostrar la ruta publica', () => {

    const initialState = {
      auth:{
        checking: false,
        uid: null
      }
    }
    let store = mockStore( initialState );
    
    const wrapper = mount(
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    )

    expect( wrapper ).toMatchSnapshot()
    expect( wrapper.find('.login-container').exists() ).toBe(true)

  })


  test('debe de mostrar la ruta privada', () => {

    const initialState = {
      auth:{
        checking: false,
        uid: '123',
        name: 'test'
      },
      calendar:{
        events: [],
      },
      ui: {
        modalOpen: false
      }
    }
    let store = mockStore( initialState );
    
    const wrapper = mount(
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    )
    expect( wrapper.find('.calendar-screen').exists() ).toBe(true)

  })
  
  
})
