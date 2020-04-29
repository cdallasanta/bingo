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
      <div id="card-header">
        <div id="b-header" className="header-cell">B</div>
        <div id="i-header" className="header-cell">I</div>
        <div id="n-header" className="header-cell">N</div>
        <div id="g-header" className="header-cell">G</div>
        <div id="o-header" className="header-cell">O</div>
      </div>
      
      <div id="card-numbers">
        {this.state.board.map((col, i) => {
          return <div key={i} className="column"> 
            {
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
    return this.state.game.drawn_numbers.reverse().map((num, i) => {
      let char = "BINGO"[Math.floor(num / 15)]
      return <div key={i}>{char} {num}</div>
    })
  }

  render(){
    let char;
    if (this.state.game.drawn_numbers) {
      char = "BINGO"[Math.floor(this.state.game.drawn_numbers[this.state.game.drawn_numbers.length-1] / 15)]
    }

    return (
      <div className="game">
        <div id="small-cards">
          {this.state.game.cards ? this.showCards() : null}
        </div>

        {this.showGrid()}

        <h2>Numbers Drawn:</h2>
        <div id="numbers">
          <div id="most-recent-num">
            {this.state.game.drawn_numbers ? 
              <b>Most Recent: {char} {this.state.game.drawn_numbers[this.state.game.drawn_numbers.length-1]}</b>
            : null }
          </div>
          {this.state.game.drawn_numbers ? this.showNumbers() : null}
        </div>
      </div>
    )
  }
}

export default Card
