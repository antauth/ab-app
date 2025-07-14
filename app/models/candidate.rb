class Candidate < ApplicationRecord
  has_many :votes
  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false }
end
