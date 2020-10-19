class StorageService {
  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

const storageService = new StorageService();
export default storageService;
