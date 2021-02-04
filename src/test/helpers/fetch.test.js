import { fetchConToken, fetchSinToken } from "../../helpers/fetch"

describe('Pruebas en el helper fetch.', () => {

  let token = '';
  
  test('fetchSinToken debe de funcionar.', async () => {
    const user = {
      email :"andres2@mail.com",
      password : "123456"
    }

    const resp = await fetchSinToken('auth', user, 'POST');

    const body = await resp.json();
  
    expect(resp instanceof Response ).toBe(true);
    expect(body.ok).toBe(true);

    token = body.token;

  })

  test('fetchConToken debe de funcionar', async () => {
    
    localStorage.setItem('token', token);

    const idTest = '601732444e74627dcd551811'

    const resp = await fetchConToken(`events/${ idTest }`, {}, 'DELETE' )
    const body = await resp.json();
    expect(body.msg).toBe('Evento no existe por ese id');

  })
  
  

})
