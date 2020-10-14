import React from 'react';
import LoginForm from './components/loginForm/loginForm';
import UsersTable from './components/usersTable/usersTable';
import networkService from './services/networkService';
import './App.css';

function App() {
  const [errorModal, setErrorModal] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [isLogin, setIsLogin] = React.useState(false);
  
  function onFinish(values) {
    networkService.authorization(values)
    .then((data) => {
      if (!data.token) {
        setErrorModal(true);
        return Promise.reject();
      }
      return data;
    })
    .then((data) => getTableData(data.token))
    .then(() => setIsLogin(true))
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
