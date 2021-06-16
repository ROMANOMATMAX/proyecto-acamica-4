import React from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/contacts/Register'
import Regions from './components/regions/Regions'
import AuthState from './context/authentication/authState'
import AlertaState from './context/alertas/alertaState'
import ContactState from './context/contacts/contactState'
import RegionState from './context/regions/regionState'
import RutaPrivada from './components/rutas/RutaPrivada'
function App() {
  return (
    <AuthState>
      <AlertaState>
        <ContactState>
          <RegionState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login}/>
                <RutaPrivada exact path="/registrarse" component={Register}/>
                <RutaPrivada exact path="/regiones" component={Regions}/>
              </Switch>
            </Router>
          </RegionState>
        </ContactState>
      </AlertaState>
    </AuthState>
  );
}

export default App;
