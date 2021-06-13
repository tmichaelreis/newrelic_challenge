class Customer < ApplicationRecord
  include PgSearch::Model

  belongs_to :company

  validates :first_name, :last_name, presence: true

  # Expose company_name for Customer records
  delegate :name, to: :company, prefix: true

  pg_search_scope :search_by_full_name,
                  against: [:first_name, :last_name],
                  using: {
                    tsearch: { prefix: true }
                  }
end
