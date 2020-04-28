class CardsChannel < ApplicationCable::Channel
  def subscribed
    game = Conversation.find(params[:game])
    stream_for game
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
