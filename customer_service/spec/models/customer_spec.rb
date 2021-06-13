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
end