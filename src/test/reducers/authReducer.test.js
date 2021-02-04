import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";

const initialState = {
  checking: true,
  // uid: null,
  // name:null,
}

describe('Pruebas en authReducer', () => {
  
  test('debe de retornar el estado por defecto', () => {
    
    const state = authReducer(initialState);
    expect( state ).toEqual( initialState );

  })

  test('debe de ejecutar el login y el logout', () => {

    const action = {
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'test'
      }
    }
    
    const state = authReducer(initialState, action)
    expect( state ).toEqual({
      checking: false,
      ...action.payload
    })

    const stateLogout = authReducer( state , { type: types.authLogout })

    expect( stateLogout ).toEqual({ checking: false })
  })
  
  

})
