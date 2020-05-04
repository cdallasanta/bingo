import React from 'react';
import '../stylesheets/card.css';
import { API_ROOT, HEADERS } from '../constants';
import stamps from '../stamps/stamps';

class Card extends React.Component {
  state = {
    board: this.props.card.board
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
        {this.props.card.board.map((col, i) => {
          return <div key={i} className="column"> 
            {
            col.map((cell, j) => {
              return <div key={j}
                className={`large-cell${this.props.card.checked[i][j] ? " checked" : ""}`}
                data-col={i}
                data-row={j}
                onClick={e => this.clickCell(e.target)}
                style={{backgroundImage: `${this.props.card.checked[i][j] ? "url("+ stamps[j] + ")" : "none"}`}}>
                  { this.props.card.ready || ( i === 2 && j === 2 )?
                    cell
                    : (<input value={this.state.board[i][j]}
                      type="number"
                      className="card-cell-input"
                      onChange={this.handleInputChange}
                      data-col={i}
                      data-row={j} 
                    />)
                  }
              </div>
            })
          }</div>
        })}
      </div>
    </div>
  }

  saveCard = () => {
    fetch(`${API_ROOT}/cards/${this.props.card.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({card: {id: this.props.card.id, board: this.state.board}})
    })
  }

  handleInputChange = e => {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    
    let newBoard = [...this.state.board];
    newBoard[col][row] = e.target.value;
    
    this.setState({
      board: newBoard
    });
  }

  clickCell = targetCell => {
    if (this.props.card.ready){
      const row = targetCell.dataset.row;
      const col = targetCell.dataset.col;
      if (this.props.card.checked[col][row]) {
        targetCell.style.backgroundImage = 'none';
      } else {
        targetCell.style.backgroundImage = `url('${stamps[targetCell.dataset.row]}')`;
      }

      let newChecked = [...this.props.card.checked]
      newChecked[col][row] = this.props.card.checked[col][row] === 0 ? 1 : 0

      fetch(`${API_ROOT}/cards/${this.props.card.id}`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({card: {id: this.props.card.id, checked: newChecked}})
      })
    }
  }

  alertBox = () => {
    return <div className="alert">
      When your numbers are how you'd like them, click "save card" below. Note: if you choose to change the numbers below, this program does not double check if the card is valid.
    </div>
  }
  
  render() {
    return (
      <div className="card">
        {this.props.card.ready ? null : this.alertBox()}
        {this.props.card.ready ? null :
          <button onClick={this.saveCard} >Save Card</button>
        }
        {this.showGrid()}
      </div>
    )
  }
}

export default Card
