import React, { Component } from 'react';

export class GameWebSocket extends Component {
  componentDidMount() {
    this.props.fetchGame()
    this.props.CableApp.game = this.props.CableApp.cable.subscriptions.create({
      channel: 'GamesChannel',
      game: this.props.gameId
    },
    {
      received: (updatedGame) => {
        this.props.updateState(updatedGame)
      }
    })
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default GameWebSocket;
