class CreateVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|
      t.belongs_to :candidate, index: true, foreign_key: true
      t.string :email

      t.timestamps
    end
  end
end
