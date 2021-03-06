import React from 'react'
import { Link } from 'react-router-dom';
import { API_ROOT, HEADERS } from '../constants';

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
    if (!this.state.games.some(g => g.id === game.id)) {
      this.setState({
        games: [...this.state.games, game]
      })
    }
  }

  createGame = () => {
    fetch(`${API_ROOT}/games`, {
      method: 'POST',
      headers: HEADERS
    }).then(resp => resp.json())
      .then(game => this.props.history.push(`/games/${game.id}`))
  }

  showGames = () =>{
    return this.state.games.map((game, i) => {
      const date = new Date(game.created_at).toDateString()
      return <li key={i}><Link key={i} to={`/games/${game.id}`}>{date}</Link></li>
    })
  }

  render(){
    return (
    <div className="gamesList">
      <button onClick={this.createGame}>Create Game</button>
      <h2>Past Games:</h2>
      <ul>
        {this.showGames()}
      </ul>
    </div>
    )
  }
}

export default GamesList;