import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Provider from './hooks/Provider';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route exact path="/foods/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route
            exact
            path="/foods/:id/in-progress"
            component={ RecipeInProgress }
          />
          <Route
            exact
            path="/drinks/:id/in-progress"
            component={ RecipeInProgress }
          />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </Provider>
    </div>
    // <div className="meals">
    //   <span className="logo">TRYBE</span>
    //   <object
    //     className="rocksGlass"
    //     type="image/svg+xml"
    //     data={ rockGlass }
    //   >
    //     Glass
    //   </object>
    // </div>
  );
}

export default App;
