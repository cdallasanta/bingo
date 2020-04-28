class Card < ApplicationRecord
  belongs_to :game

  def create_board
    "BINGO".chars.each_with_index do |char, i|
      column = []
      5.times do
        num = (rand() * 15 + (15 * i) + 1).floor
        while column.include?(num) do
          num = (rand() * 15 + (15 * i) + 1).floor
        end
        column << num
      end
      self.board << column
    end
    self.board[2][2] = "Free Space"
  end
end
