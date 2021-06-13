# frozen_string_literal: true

class Customer < ApplicationRecord
  include PgSearch::Model

  belongs_to :company

  validates :first_name, :last_name, presence: true

  # Expose company_name for Customer records
  delegate :name, to: :company, prefix: true

  pg_search_scope :search_by_full_name,
                  against: %i[first_name last_name],
                  using: {
                    tsearch: { prefix: true }
                  }

  # Scope to filter Customers by Company name (case and whitespace insensitive)
  def self.with_company_name(company_name)
    joins(:company).where('lower(companies.name) = ?', company_name.downcase.strip)
  end
end
