import { types } from "../../types/types"

describe('Pruebas en Types', () => {
  
  test('Los types debeb ser iguales.', () => {
    
    expect(types).toEqual({

      uiOpenModal: '[ui] Open modal',
      uiCloseModal: '[ui] Close modal',
       
      //Calendar
      eventSetActive: '[event] Set active',
      eventLogout: '[event] Event logout',
      eventStartAddNew: '[event] Start add new',
      eventAddNew: '[event] Add new',
      eventClearActiveEvent: '[event] Clear active event',
      eventUpdated: '[event] Event updated',
      eventDeleted: '[event] Event deleted',
      eventLoaded: '[event] Event loaded',
    
    
      //Auth
      authCheckingFinish: '[auth] Finish cheching login state',
      authStartLogin: '[auth] Start login',
      authLogin: '[auth] Login',
      authStartRegister: '[auth] Start Register',
      authStartTokenRenew: '[auth] Start token renew',
      authLogout: '[auth] Logout',
    
    
    })

  })
  
})
