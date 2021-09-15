import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/UserLogin/LoginPage.js';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  const Routing = () => {
    return (
      <Switch>
        <Route path='/login' exact >
          <LoginPage />
        </Route>
        <ProtectedRoute path='/' component={HomePage} />
      </Switch>
    );
  };
  return (
    <div className="App">
      <BrowserRouter>
        {Routing()}
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
