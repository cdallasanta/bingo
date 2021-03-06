import React, { Component } from 'react'
import '../stylesheets/smallCard.css'

export class SmallCard extends Component {
  showGrid = () => {
    return <div className={`small-grid ${this.props.ready ? "ready" : "not-ready"}`}>
      {this.props.checked.map((col, i) => {
        return <div key={i} className="small-column"> {
          col.map((cell, i) => {
            return <div key={i} className={`small-cell${cell === 1 ? " checked" : ""}`} />
          })
        }</div>
      })}
    </div>
  }

  render() {
    return (
      <div className="card-div">
        {this.props.user}:
        {this.showGrid()}
      </div>
    )
  }
}

export default SmallCard
