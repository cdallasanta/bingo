class GamesController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    games = Game.all
    render json: games
  end

  def create
    game = Game.new
    if game.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        GameSerializer.new(game)
      ).serializable_hash
      ActionCable.server.broadcast 'games_channel', serialized_data
      head :ok
    end
  end

  def show
    render json: Game.find(params[:id])
  end
end
