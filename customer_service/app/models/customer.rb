class Customer < ApplicationRecord
  belongs_to :company

  validates :first_name, :last_name, presence: true

  # Expose company_name for Customer records
  delegate :name, to: :company, prefix: true
end
