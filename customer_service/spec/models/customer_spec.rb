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
end
