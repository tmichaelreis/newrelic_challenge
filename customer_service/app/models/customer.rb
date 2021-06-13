class Customer < ApplicationRecord
  belongs_to :company

  validates :first_name, :last_name, presence: true
end
