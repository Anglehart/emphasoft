class NetworkService {
  constructor() {
    this.authUrl = 'http://emphasoft-test-assignment.herokuapp.com/api-token-auth/';
    this.getAllUrl = 'http://emphasoft-test-assignment.herokuapp.com/api/v1/users/';
  }
  
  authorization(data) {
    return fetch(this.authUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'username':data.username, 'password':data.password}),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return res.status;
    })
  }
  
  getAllUsers(token) {
    console.log(token)
    const result = fetch(this.getAllUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }
    });
    return result;
  }

}

const networkService = new NetworkService();
export default networkService;
