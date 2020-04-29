import React, { Component } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import SmallCard from './smallCard';
import { Link } from 'react-router-dom';

class Game extends Component {
  constructor(props){
    super(props);
    this.timer = setInterval(() => this.fetchGame(), 3000);
  }
  
  state = {
    game_id: this.props.match.params.game_id,
    drawn_numbers: [],
    most_recent_num: null,
    cards: [],
    newUser: ""
  }

  componentDidMount = () => {
    this.fetchGame()
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  fetchGame = () => {
    fetch(`${API_ROOT}/games/${this.state.game_id}`)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          ...this.state,
          ...data
        })
      })
  }

  createCard = () => {
    fetch(`${API_ROOT}/cards`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({card: {game_id: this.state.game_id, user: this.state.newUser}})
    }).then(resp => resp.json())
      .then(data=> this.setState({cards: [...this.state.cards, data]}))
  }

  showCards = () => {
    return this.state.cards.map((card, i) => {
      return <Link key={i} to={`/cards/${card.id}`}><SmallCard checked={card.checked} user={card.user} key={i} /></Link>
    })
  }
  
  showNumbers = () => {
    return this.state.drawn_numbers.map((num, i) => {
      return <div key={i}>{num}</div>
    })
  }

  drawNumber = () => {
    let num;
    do {
      num = Math.floor(Math.random()*75 + 1);
    } while (this.state.drawn_numbers.includes(num));
    fetch(`${API_ROOT}/games/${this.state.game_id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({game: {
        game_id: this.state.game_id,
        drawn_numbers: [...this.state.drawn_numbers, num].sort()}})
      }
    ).then(resp => resp.json())
      .then(game => {
        this.setState({drawn_numbers: game.drawn_numbers, most_recent_num: num})
      })
  }

  render(){
    return (
      <div className="game">
        <h2>Cards</h2>
        <input value={this.state.newUser} onChange={e => this.setState({newUser: e.target.value})} />
        <button onClick={this.createCard}>New Card</button>
        <div id="cards">
          {this.showCards()}
        </div>

        <h2>Numbers</h2>
        <button onClick={this.drawNumber}>Draw Number</button>
        <div id="numbers">
          <b>{this.state.most_recent_num}</b>
          {this.showNumbers()}
        </div>
      </div>
    )
  }
}

export default Game
