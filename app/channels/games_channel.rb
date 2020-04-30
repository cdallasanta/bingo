class GamesChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find(params[:game])
    stream_for @game
  end

  def received(data)
    GamesChannel.broadcast_to(@game, {
      id: @game.id,
      cards: @game.cards.sort_by{|c| c.id},
      drawn_numbers: @game.drawn_numbers,
      created_at: @game.created_at
    })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
