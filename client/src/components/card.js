import React from 'react';
import '../stylesheets/card.css';
import { API_ROOT, HEADERS } from '../constants';
import stamps from '../stamps/stamps';

const Card = ({card}) => {
  const showGrid = () => {
    return <div className="large-grid">
      <div id="card-header">
        <div id="b-header" className="header-cell">B</div>
        <div id="i-header" className="header-cell">I</div>
        <div id="n-header" className="header-cell">N</div>
        <div id="g-header" className="header-cell">G</div>
        <div id="o-header" className="header-cell">O</div>
      </div>
      
      <div id="card-numbers">
        {card.board.map((col, i) => {
          return <div key={i} className="column"> 
            {
            col.map((cell, j) => {
              return <div key={j}
                className={`large-cell${card.checked[i][j] ? " checked" : ""}`}
                data-col={i}
                data-row={j}
                onClick={e => clickCell(e.target)}
                style={{backgroundImage: `${card.checked[i][j] ? "url("+ stamps[j] + ")" : "none"}`}}>{cell}
              </div>
            })
          }</div>
        })}
      </div>
    </div>
  }

  const clickCell = targetCell => {
    const row = targetCell.dataset.row;
    const col = targetCell.dataset.col;
    if (card.checked[col][row]) {
      targetCell.style.backgroundImage = 'none';
    } else {
      targetCell.style.backgroundImage = `url('${stamps[targetCell.dataset.row]}')`;
    }
    let newChecked = [...card.checked]
    newChecked[col][row] = card.checked[col][row] === 0 ? 1 : 0
    fetch(`${API_ROOT}/cards/${card.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({card: {id: card.id, checked: card.checked}})
    })
  }
  
  return (
    <div className="card">
      {showGrid()}
    </div>
  )
}

export default Card
