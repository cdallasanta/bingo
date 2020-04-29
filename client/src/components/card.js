import React, { Component } from 'react';
import '../stylesheets/card.css';
import { API_ROOT, HEADERS } from '../constants';
import SmallCard from './smallCard';
import stamps from '../stamps/stamps';

export class Card extends Component {
  constructor(props){
    super(props);
    this.timer = setInterval(() => this.fetchGame(), 3000);
  }

  state = {
    id: this.props.match.params.card_id,
    board: [[]],
    checked: [[]],
    game: {},
    user: ""
  }

  componentDidMount = () => {
    this.fetchGame()
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  showGrid = () => {
    return <div className="large-grid">
      {this.state.board.map((col, i) => {
        return <div key={i} className="column"> {
          col.map((cell, j) => {
            return <div key={j}
              className={`large-cell${this.state.checked[i][j] ? " checked" : ""}`}
              data-col={i}
              data-row={j}
              onClick={e => this.clickCell(e.target)}
              style={{backgroundImage: `${this.state.checked[i][j] ? "url("+ stamps[j] + ")" : "none"}`}}>{cell}
            </div>
          })
        }</div>
      })}
    </div>
  }

  clickCell = targetCell => {
    const row = targetCell.dataset.row;
    const col = targetCell.dataset.col;
    if (this.state.checked[col][row]) {
      targetCell.style.backgroundImage = 'none';
    } else {
      targetCell.style.backgroundImage = `url('${stamps[targetCell.dataset.row]}')`;
    }
    let newChecked = [...this.state.checked]
    newChecked[col][row] = this.state.checked[col][row] === 0 ? 1 : 0
    fetch(`${API_ROOT}/cards/${this.state.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({card: {id: this.state.id, checked: this.state.checked}})
    }).then(resp => resp.json())
      .then(card => this.setState(card))
  }

  fetchGame = () => {
    fetch(`${API_ROOT}/cards/${this.state.id}`)
      .then(resp => resp.json())
      .then(data => this.setState(data))
  }

  showCards = () => {
    return this.state.game.cards.map((card, i) => {
      return <SmallCard key={i} checked={card.checked} user={card.user} />
    })
  }
  
  showNumbers = () => {
    return this.state.game.drawn_numbers.map((num, i) => {
      return <div key={i}>{num}</div>
    })
  }

  render(){
    return (
      <div className="game">
        <h2>Cards</h2>
        <div id="cards">
          {this.state.game.cards ? this.showCards() : null}
        </div>

        {this.showGrid()}

        <h2>Numbers</h2>
        <div id="numbers">
          <b>{this.state.most_recent_num}</b>
          {this.state.game.drawn_numbers ? this.showNumbers() : null}
        </div>
      </div>
    )
  }
}

export default Card
