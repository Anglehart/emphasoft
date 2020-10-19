import React from 'react';
import LoginForm from './components/loginForm/loginForm';
import UsersTable from './components/usersTable/usersTable';
import networkService from './services/networkService';
import storageService from './services/storageService';
import { Modal } from 'antd';
import './App.css';

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLogin, setIsLogin] = React.useState();

  function onFinish(values) {
    networkService.authorization(values)
    .then((data) => {
      if (!data.token) {
        return Promise.reject(data);
      }
      storageService.setToken(data.token);
      return data;
    })
    .then(() => setIsLogin(true))
    .catch((err) => showMessage(err))
  };
  
  function onLogOut(){
    setIsLogin(false);
    storageService.setToken('');
  }

  function showMessage(err) {
    let message = '';
    if (err === (400 || 401)) {message = 'Wrong username or password';}
    else {message = `Error: ${err}. Try again later.`;}
    Modal.error({
      content: message,
    })
    
  }

  React.useEffect(() => {
    const token = storageService.getToken();
    if (token) {
      networkService.getAllUsers(token)
      .then((res) => {
        if (!res) return Promise.reject(res);
        setUsers(res);
        setIsLogin(true);
      })
      .catch(() => {
        setIsLogin(false);
      })
    } else {
      setIsLogin(false);
    }
  }, [isLogin])

  return (
    <div className="App">
      {isLogin === true && <UsersTable users={users} onLogOut={onLogOut}/>}
      {isLogin === false && <LoginForm onFinish={onFinish}/>}
    </div>
  );
}

export default App;
