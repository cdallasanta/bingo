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

  def update
    game = Game.find(game_params[:game_id])
    if game.update(drawn_numbers: game_params[:drawn_numbers].sort())
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        GameSerializer.new(game)
      ).serializable_hash
      ActionCable.server.broadcast 'games_channel', serialized_data
      head :ok
    end
  end

  private

  def game_params
    params.require(:game).permit(:game_id, drawn_numbers: [])
  end
end
