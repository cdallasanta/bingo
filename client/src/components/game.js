import React, { Component } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import SmallCard from './smallCard';
import { Link } from 'react-router-dom';
import GameWebSocket from './gameWebSocket';
import Card from './card';

class Game extends Component {
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

  fetchGame = () => {
    fetch(`${API_ROOT}/games/${this.state.game_id}`)
      .then(resp => resp.json())
      .then(data => this.updateState(data))
  }

  updateState = data => {
    this.setState({
      ...this.state,
      ...data
    })
  }

  createCard = () => {
    fetch(`${API_ROOT}/cards`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({card: {game_id: this.state.game_id, user: this.state.newUser}})
    })
  }

  showCards = () => {
    return this.state.cards.map((card, i) => {
      return <Link key={i}
        to={{pathname: `/games/${this.state.game_id}/cards/${card.id}`}}>
          <SmallCard checked={card.checked} user={card.user} key={i} />
        </Link>
    })
  }
  
  showNumbers = () => {
    return this.state.drawn_numbers.reverse().map((num, i) => {
      let char = "BINGO"[Math.floor(num / 15)]
      return <div key={i}>{char} {num}</div>
    })
  }

  drawNumber = () => {
    const NUMS = [...Array(75).keys()].filter(n => !this.state.drawn_numbers.includes(n))
    let num = NUMS[Math.floor(Math.random()*NUMS.length)];
    fetch(`${API_ROOT}/games/${this.state.game_id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({game: {
        game_id: this.state.game_id,
        drawn_numbers: [...this.state.drawn_numbers, num]}})
      }
    )
  }

  render(){
    let char;
    if (this.state.drawn_numbers) {
      char = "BINGO"[Math.floor((this.state.drawn_numbers[this.state.drawn_numbers.length-1]-1) / 15)]
    }
    const cardId = this.props.match.params.card_id
    
    return (
      <div className="game">
        <div>
          <h2>Cards</h2>
          {cardId ? null :
            <div id="new-card">
              <form onSubmit={this.createCard}>
                <input value={this.state.newUser} onChange={e => this.setState({newUser: e.target.value})} />
                <button type="submit" disabled={this.state.drawn_numbers.length === 75}>New Card</button>
              </form>
            </div>
          }

          <div id="small-cards">
            {this.showCards()}
          </div>
        </div>

        {cardId ? null : 
          <div style={{margin: "5px"}}>
            Invite more players using this link: <br />
            <a href={`https://bingo-bango-bongo.herokuapp.com${this.props.location.pathname}`}>{`https://bingo-bango-bongo.herokuapp.com${this.props.location.pathname}`}</a>
          </div>
        }

        {this.state.cards.find(c => c.id === parseInt(cardId)) ?
          <Card
            card={this.state.cards.find(c => c.id === parseInt(cardId))}
            game={this.state}
          />
        : null }

        <div>
          <h2>Numbers Drawn:</h2>
          {cardId ? null : <button onClick={this.drawNumber}>Draw Number</button> }

          <div id="numbers">
            <div id="most-recent-num">
              {this.state.drawn_numbers ? 
                <b>Most Recent: {char} {this.state.drawn_numbers[this.state.drawn_numbers.length-1]}</b>
              : null }
            </div>
            {this.showNumbers()}
          </div>
        </div>

        <GameWebSocket
          CableApp={this.props.CableApp}
          fetchGame={this.fetchGame}
          gameId={this.props.match.params.game_id}
          updateState={this.updateState}
        />
      </div>
    )
  }
}

export default Game
