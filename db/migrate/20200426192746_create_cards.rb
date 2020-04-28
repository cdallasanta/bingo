class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.integer :board, array: true, default: []
      t.integer :checked, array: true, default: []
      t.integer :game_id
      t.string :user
      t.boolean :ready, default: false
      t.timestamps
    end
  end
end
