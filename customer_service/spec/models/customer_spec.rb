require 'rails_helper'

RSpec.describe Customer, type: :model do
  context 'associations' do
    it { should belong_to(:company) }
  end

  context 'validations' do
    subject { FactoryBot.build(:customer) }

    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
  end

  it 'should return company name' do
    company = FactoryBot.create(:company, name: 'New Relic')
    customer = FactoryBot.create(:customer, company: company)
    expect(customer.company_name).to eq('New Relic')
  end

  describe '#search_by_full_name' do
    let!(:matching_customer) do
      FactoryBot.create(:customer, first_name: 'Tom', last_name: 'Reis')
    end
    let!(:other_customer) do
      FactoryBot.create(:customer, first_name: 'Notta', last_name: 'Match')
    end

    it 'returns records based on exact first name' do
      results = Customer.search_by_full_name('Tom')
      expect(results).to contain_exactly(matching_customer)
    end

    it 'returns records based on exact last name' do
      results = Customer.search_by_full_name('Reis')
      expect(results).to contain_exactly(matching_customer)
    end

    it 'is not case sensitive for first names' do
      results = Customer.search_by_full_name('tOm')
      expect(results).to contain_exactly(matching_customer)
    end

    it 'is not case sensitive for last names' do
      results = Customer.search_by_full_name('reIs')
      expect(results).to contain_exactly(matching_customer)
    end

    it 'returns partial first name matches' do
      results = Customer.search_by_full_name('to')
      expect(results).to contain_exactly(matching_customer)
    end

    it 'returns partial last name matches' do
      results = Customer.search_by_full_name('rei')
      expect(results).to contain_exactly(matching_customer)
    end
  end
end
