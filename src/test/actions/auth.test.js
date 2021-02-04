import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Swal from 'sweetalert2';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import * as fetchModule from '../../helpers/fetch';
import { types } from '../../types/types';

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))


const middleware = [ thunk ];
const mockStore = configureStore(middleware);

const initialState = {}
let store = mockStore( initialState );

//Simular localstorage
Storage.prototype.setItem = jest.fn()

describe('Pruebas en las acciones del auth.', () => {
  
  beforeEach(() => {
    store = mockStore( initialState );
    jest.clearAllMocks();
  })

  test('startLogin correcto.', async () => {
    
    await store.dispatch( startLogin('andres2@mail.com', '123456') );
    
    const actions = store.getActions()

    expect( actions[0] ).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any( String ),
        name: expect.any( String ),
      }
    })
    
    expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any( String ))
    expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any( Number ))

    //token = localStorage.setItem.mock.calls[0][1];

  })

  test('startLogin incorrecto', async() => {
    
    await store.dispatch( startLogin('andres2@mail.com', '1234564') );
    
    let actions = store.getActions()

    expect(actions).toEqual([])
    expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error')
    
    await store.dispatch( startLogin('andres2@mail.co', '123456') );
    actions = store.getActions()

    expect( Swal.fire ).toHaveBeenCalledWith('Error', 'El usuario no existe con este email', 'error')
    
  })


  test('startRegister correcto', async () => {

    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'carlos',
          token: 'ABC1234'
        }
      }
    }));
    
    await store.dispatch( startRegister( 'test@mail.com', '123456', 'test' ) );

    const actions = store.getActions();
    
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'carlos',
      }
    })

    expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC1234')
    expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any( Number ))

  })
  

  test('startChecking correcto', async () => {
    
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'carlos',
          token: 'ABC1234'
        }
      }
    }));

    await store.dispatch( startChecking() )

    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'carlos',
      }
    })

    expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any( String ))

  })
  
  
  
})
