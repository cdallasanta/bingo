class CardSerializer < ActiveModel::Serializer
  attributes :id, :board, :checked, :user, :ready, :game_id
end
