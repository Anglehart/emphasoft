import React from 'react';
import LoginForm from './components/loginForm/loginForm';
import UsersTable from './components/usersTable/usersTable';
import networkService from './services/networkService';
import storageService from './services/storageService';
import { Modal } from 'antd';
import './App.css';

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLogin, setIsLogin] = React.useState(false);

  function onFinish(values) {
    networkService.authorization(values)
    .then((data) => {
      if (!data.token) {
        return Promise.reject(data);
      }
      storageService.setToken(data.token);
      return data;
    })
    .then((data) => getTableData())
    .catch((err) => showMessage(err))
  };

  function getTableData() {
    const token = storageService.getToken();
    networkService.getAllUsers(token)
    .then((res) => {
      if (!res) return Promise.reject(res);
      console.log(res);
    })
    .then(() => setIsLogin(true))
    .then(res => setUsers(res))
    .catch((err) => showMessage('invalid token'))
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
    getTableData();
  })

  return (
    <div className="App">
      {isLogin
        ?<UsersTable users={users}/>
        :<LoginForm onFinish={onFinish}/>
      }
    </div>
  );
}

export default App;
