class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.integer :board, array: true, default: []
      t.integer :checked, array: true, default: Array.new(5).fill(Array.new(5).fill(false))
      t.integer :game_id
      t.string :user
      t.timestamps
    end
  end
end
