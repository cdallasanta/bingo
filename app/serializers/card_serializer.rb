class CardSerializer < ActiveModel::Serializer
  attributes :id, :board, :checked, :user
  belongs_to :game
end
