


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {LoginPage } from './LoginPage/LoginPage.jsx';
import { CalendarPage } from './CalendarPage/CalendarPage.jsx';
import { RegisterActivies } from './RegisterActivies/RegisterActivies.jsx';
import { RegisterPage } from './RegisterLoginPage/RegisterPage.jsx';
import { UpdatesActivies } from './updateActivies/updateActivies.js';
function App() {

  return (
    <BrowserRouter>
        <Routes>
              <Route exact path="/" element= {<LoginPage />}/>
              <Route exact path="/register" element= {<RegisterPage />}/>
              <Route exact path="/user" element= {<CalendarPage />}/>
              <Route exact path="/user/update" element= {<UpdatesActivies />}/>
              <Route exact path="/user/register" element= {<RegisterActivies />}/>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
