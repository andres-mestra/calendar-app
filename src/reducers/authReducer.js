import { types } from "../types/types";

const initialState = {
  checking: true,
  // uid: null,
  // name:null,
}

export const authReducer = ( state = initialState, action ) => {
  
  switch (action?.type) {

    case types.authLogin:
      return {
        ...state,
        cheching: false,
        ...action.payload
      }
    
  
    default:
      return state;
  }
}
