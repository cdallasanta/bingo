import React, {Component} from 'react';
import GamesList from './components/gamesList';
import Game from './components/game';
import { Route, Switch } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          {/* <Route path="/cards/:card_id"
            component={PreuseInspectionContainer}
          /> */}
          <Route path="/games/:game_id"
            component={Game}
          />
          <Route path="/"
            component={GamesList}
          />
        </Switch>
      </div>
    )
  }
}

export default App;
