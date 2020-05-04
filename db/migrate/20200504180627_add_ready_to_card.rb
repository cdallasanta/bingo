class AddReadyToCard < ActiveRecord::Migration[6.0]
  def change
    add_column :cards, :ready, :boolean
  end
end
