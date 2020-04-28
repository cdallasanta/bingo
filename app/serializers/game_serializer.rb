class GameSerializer < ActiveModel::Serializer
  attributes :id, :drawn_numbers
  has_many :cards
end
