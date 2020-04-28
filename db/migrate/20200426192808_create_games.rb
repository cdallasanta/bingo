class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :drawn_numbers, array: true, default: []
      t.boolean :started, default: false
      t.timestamps
    end
  end
end
