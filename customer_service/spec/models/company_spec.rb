# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Company, type: :model do
  context 'validations' do
    subject { FactoryBot.build(:company) }

    it { should validate_presence_of(:name) }
  end
end
