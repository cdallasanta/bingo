class Api::CardsController < ApplicationController

  def create
    card = Card.new(card_params)
    card.create_board
    game = Game.find(card_params[:game_id])
    if card.save
      GamesChannel.broadcast_to(game, {
        id: game.id,
        cards: game.cards.sort_by{|c| c.id},
        drawn_numbers: game.drawn_numbers,
        created_at: game.created_at
      })
    end
  end

  def show
    render json: Card.find(params[:id])
  end

  def update
    card = Card.find(card_params[:id])
    game = card.game
    if card.update(card_params)
      GamesChannel.broadcast_to(game, {
        id: game.id,
        cards: game.cards.sort_by{|c| c.id},
        drawn_numbers: game.drawn_numbers,
        created_at: game.created_at
      })
    end
  end

  private

  def card_params
    hash = params.require(:card).permit(
      :id,
      :user,
      :ready,
      :game_id
    )
    hash[:checked] = params["card"].require(:checked) if params["card"]&.has_key?(:checked)
    hash[:board] = params["card"].require(:board) if params["card"]&.has_key?(:board)
    hash
  end
end
