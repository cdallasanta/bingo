class GameSerializer < ActiveModel::Serializer
  attributes :id, :drawn_numbers, :cards, :created_at

  def cards
    object.cards.sort_by{|c| c.id}
  end
end
