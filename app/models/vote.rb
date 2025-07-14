class Vote < ApplicationRecord
  belongs_to :candidate
  validates :email, presence: true
  validates :email, uniqueness: { case_sensitive: false }
end
