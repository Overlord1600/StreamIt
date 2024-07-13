import "./App.css";
import HomePage from "./home/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SinglePage from "./components/watch/SinglePage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ChoiceProvider } from "./context/ChoiceContext";
import MoviesGrid from "./components/AllItems/AllItems";
import Categories from "./components/categories/Categories";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from './components/ProtectedRoute';
import WatchLater from "./components/WatchLater/watchlater";
import { UserProvider } from "./context/UserContext";
import Episodes from "./components/watch/Episodes";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ChoiceProvider>
          <Router>
            <PrivateRoute component={Header} />
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <PrivateRoute exact path='/' component={HomePage} />
              <PrivateRoute exact path='/series' component={HomePage} />
              <PrivateRoute path='/singlepage/:movieId/:type' component={SinglePage} exact />
              <PrivateRoute
                path='/all'
                render={(props) => (
                  <MoviesGrid
                    movies={props.location.state?.items || []}
                    title={props.location.state?.title || ''}
                  />
                )}
                exact
              />
              <PrivateRoute path='/episode' render={(props) => (<Episodes items={props.location.state?.items} seriesTitle={props.location.state?.seriesTitle} movieId={props.location.state?.movieId}/>)} exact/>
              <PrivateRoute path='/genres' component={Categories} />
              <PrivateRoute path='/watchlater' component={WatchLater} />
            </Switch>
            <Footer />
          </Router>
        </ChoiceProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
