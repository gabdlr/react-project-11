import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

//States
import ProyectoState from './context/proyectos/ProyectoState';
import TareaState from './context/tareas/TareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/auth/authState';
import RutaPrivada from './components/rutas/RutaPrivada';
import tokenAuth from './config/token';

//Revisar si tenemos un token
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <div className="App">
      <ProyectoState>
        <TareaState>
          <AlertaState>
            <AuthState> 
            <Router>
                <Switch>
                  <Route exact path="/" component={Login}/>
                  <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
                  <RutaPrivada exact path="/proyectos" component={Proyectos} /> 
                </Switch>
              </Router>
            </AuthState>
          </AlertaState>
        </TareaState>
      </ProyectoState>
    </div>

  );
}

export default App;
