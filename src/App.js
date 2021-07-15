import React from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/contacts/Register'
import Regions from './components/regions/Regions'
import Usuarios from './components/usuarios/Usuarios'
import Companias from './components/compañias/Companias'
import NewContact from './components/contacts/NewContact'
import NewCompany from './components/compañias/NewCompany';
import NewUser from './components/usuarios/NewUser';
import UpdateUser from './components/usuarios/UpdateUser'
import NewRegion from './components/regions/NewRegion';
import NewCountry from './components/regions/NewCountry';
import NewCity from './components/regions/NewCity';
import UpdateContact from './components/contacts/UpdateContact';
import UpdateCompany from './components/compañias/UpdateCompany';
import AuthState from './context/authentication/authState'
import AlertaState from './context/alertas/alertaState'
import ContactState from './context/contacts/contactState'
import RegionState from './context/regions/regionState'
import UserState from './context/usuarios/userState'
import RutaPrivada from './components/rutas/RutaPrivada'
function App() {
  return (
    <AuthState>
      <AlertaState>
        <ContactState>
          <RegionState>
            <UserState>
              <Router>
                <Switch>
                  <Route exact path="/" component={Login}/>
                  <RutaPrivada exact path="/registrarse" component={Register}/>
                  <RutaPrivada exact path="/regiones" component={Regions}/>
                  <RutaPrivada exact path="/usuarios" component={Usuarios}/>
                  <RutaPrivada exact path="/companias" component={Companias}/>
                  <RutaPrivada exact path="/add-new-contact" component={NewContact}/>
                  <RutaPrivada exact path="/modify-contact" component={UpdateContact}/>
                  <RutaPrivada exact path="/add-new-company" component={NewCompany}/>
                  <RutaPrivada exact path="/add-new-user" component={NewUser}/>
                  <RutaPrivada exact path="/modify-user" component={UpdateUser}/>
                  <RutaPrivada exact path="/add-new-region" component={NewRegion}/>
                  <RutaPrivada exact path="/add-new-country" component={NewCountry}/>
                  <RutaPrivada exact path="/add-new-city" component={NewCity}/>
                  <RutaPrivada exact path="/modify-company" component={UpdateCompany}/>
                </Switch>
              </Router>
            </UserState>
          </RegionState>
        </ContactState>
      </AlertaState>
    </AuthState>
  );
}

export default App;
