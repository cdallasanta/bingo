import React, { Component } from 'react'
import { API_ROOT, HEADERS } from '../constants'
import { ActionCable } from 'react-actioncable-provider';

export class Game extends Component {
  state = {
    game_id: this.props.match.params.game_id,
    drawn_numbers: [],
    cards: [],
    newUser: ""
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/games/${this.state.game_id}`)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          ...this.state,
          ...data
        })
      })
  }

  handleReceivedCard = response => {
    const {card} = response;
    if (!this.state.cards.some(c => c.id === card.id)) {
      this.setState({
        cards: [...this.state.cards, card]
      })
    }
  }

  createCard = () => {
    fetch(`${API_ROOT}/cards`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({card: {game_id: this.state.game_id, user: this.state.newUser}})
    }).then(() => this.setState({newUser: ""}))
  }

  showCards = () => {
    return this.state.cards.map((card, i) => {
      return <li key={i}>{card.user}</li>
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
      num = Math.random()*15 + 1;
    } while (this.state.drawn_numbers.includes(num));
    this.setState({drawn_numbers: [...this.drawn_numbers, num].sort()});
  }

  render(){
    return (
      <div className="game">
        <ActionCable
          channel={{channel: "CardsChannel" , game: this.state.game_id}}
          onReceived={this.handleReceivedCard}
        />
        <h2>Cards</h2>
        <input value={this.state.newUser} onChange={e => this.setState({newUser: e.target.value})} />
        <button onClick={this.createCard}>New Card</button>
        <ul>
          {this.showCards()}
        </ul>

        <h2>Numbers</h2>
        <button onClick={this.drawNumber}>New Card</button>
        <div id="numbers">
          {this.showNumbers()}
        </div>
      </div>
    )
  }
}

export default Game
