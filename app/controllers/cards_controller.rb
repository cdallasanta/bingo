class CardsController < ApplicationController
  def create
    card = Card.new(card_params)
    game = Game.find(card_params[:game_id])
    if card.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        CardSerializer.new(card)
      ).serializable_hash
      CardsChannel.broadcast_to game, serialized_data
      head :ok
    end
  end

  private

  def card_params
    params.require(:card).permit(
      :id, :board, :checked, :user, :ready, :game_id
    )
  end
end
