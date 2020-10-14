import React from 'react';
import LoginForm from './components/loginForm/loginForm';
import './App.css';

function App() {
  function onFinish(values) {
    console.log(values);
  };
  
  return (
    <div className="App">
      <LoginForm onFinish={onFinish}/>
    </div>
  );
}

export default App;
