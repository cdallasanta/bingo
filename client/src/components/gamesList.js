import React from 'react'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT, HEADERS } from '../constants';
// import Cable from './Cable';

class GamesList extends React.Component {
  state = {
    games: []
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/games`)
      .then(res => res.json())
      .then(games => this.setState({games}))
  }

  handleReceivedGame = response => {
    const {game} = response;
    this.setState({
      games: [...this.state.games, game]
    })
  }

  createGame = () => {
    fetch(`${API_ROOT}/games/new`, {
      method: 'POST',
      headers: HEADERS
    })
      .then(resp => resp.json())
      .then(resp => console.log(resp))
  }

  showGames = () =>{
    this.state.games.map((game, i) => {
      return <li key={i}>{game.id}</li>
    })
  }

  render(){
    return (
    <div className="gamesList">
      <ActionCable
        channel={{channel: "GamesChannel" }}
        onReceived={this.handleReceivedGame}
      />
      {/* {this.state.games.length ? (
        <Cable
          games={this.state.games}
        />
      ) : null
      } */}
      <button onClick={this.createGame}>New Game</button>
      <h2>Games</h2>
      <ul>
        {this.showGames}
      </ul>
    </div>
    )
  }
}

export default GamesList;