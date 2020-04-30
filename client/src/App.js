import React, {Component} from 'react';
import GamesList from './components/gamesList';
import Game from './components/game';
import { Route, Switch } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/games/:game_id/cards/:card_id"
            render={props => {
              return <Game
                {...props}
                CableApp={this.props.CableApp}
              />}}
          />
          <Route path="/games/:game_id"
            render={props => {
              return <Game
                {...props}
                CableApp={this.props.CableApp}
              />}}
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
