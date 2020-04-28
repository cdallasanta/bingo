class GamesController < ApplicationController
  def index
    games = Game.all
    render json: games
  end

  def create
    game = Game.new(game_params)
    if game.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        GameSerializer.new(game)
      ).serializable_hash
      ActionCable.server.broadcast 'games_channel', serialized_data
      head :ok
    end
  end
end
