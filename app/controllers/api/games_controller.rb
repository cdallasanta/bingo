class Api::GamesController < ApplicationController

  def index
    games = Game.all.sort_by{|g| g.created_at}.reverse
    render json: games
  end

  def create
    game = Game.new
    if game.save
      render json: game
    end
  end

  def show
    render json: Game.find(params[:id])
  end

  def update
    game = Game.find(game_params[:game_id])
    if game.update(drawn_numbers: game_params[:drawn_numbers])
      render json: game
    end
  end

  private

  def game_params
    params.require(:game).permit(:game_id, drawn_numbers: [])
  end
end
