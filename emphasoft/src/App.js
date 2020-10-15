import React from 'react';
import LoginForm from './components/loginForm/loginForm';
import UsersTable from './components/usersTable/usersTable';
import networkService from './services/networkService';
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
      return data;
    })
    .then((data) => getTableData(data.token))
    .then(() => setIsLogin(true))
    .catch((err) => {
      let message = '';
      if (err === (400 || 401)) {message = 'Wrong username or password';}
      else {message = `Error ${err}. Try again later.`;}
      Modal.error({
        content: message,
      })})
  };
  
  function getTableData(token) {
    networkService.getAllUsers(token)
    .then(res => res.json())
    .then(res => setUsers(res))
  }
  
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
