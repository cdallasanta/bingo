import React, {Component} from 'react';
import './App.css';
import GamesList from './components/gamesList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GamesList />
      </div>
    )
  }
}

export default App;
