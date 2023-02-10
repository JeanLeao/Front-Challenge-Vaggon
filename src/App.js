


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {LoginPage } from './LoginPage/LoginPage.js';
import { CalendarPage } from './CalendarPage/CalendarPage.js';
import { RegisterActivies } from './RegisterActivies/RegisterActivies.js';
import { RegisterPage } from './RegisterLoginPage/RegisterPage.js';
import { UpdatesActivies } from './updateActivies/updateActivies.js';
function App() {

  return (
    <BrowserRouter>
        <Routes>
              <Route exact path="/" element= {<LoginPage />}/>
              <Route exact path="/register" element= {<RegisterPage />}/>
              <Route exact path="/user" element= {<CalendarPage />}/>
              <Route exact path="/user/register" element= {<RegisterActivies />}/>
              <Route exact path="/user/update" element= {<UpdatesActivies />}/>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
