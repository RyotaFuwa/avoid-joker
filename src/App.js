import React from "react";
import './App.scss';
import {Switch, Route} from "react-router";
import {Menu} from "./pages/menu/menu.page";
import {Game} from "./pages/game/game.page";
import {Settings} from "./pages/settings/settings.page";

function App() {
  return (
      <Switch>
          <Route exact path='/' component={Menu} />
          <Route exact path='/game' component={Game} />
          <Route exact path='/settings' component={Settings} />
      </Switch>
  );
}

export default App;
