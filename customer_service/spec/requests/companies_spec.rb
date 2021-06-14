# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Companies endpoint', type: :request do
  describe 'companies index' do
    before do
      FactoryBot.create_list(:company, 3)
    end

    before do
      get('/companies')
    end

    it 'returns a success' do
      expect(response).to have_http_status(:ok)
    end

    it 'returns all companies' do
      returned_company_ids = json_body.map { |company| company['id'] }
      expect(returned_company_ids).to contain_exactly(*Company.all.map(&:id))
    end

    it 'returns companies in the correct shape' do
      company_response = json_body.first
      expected_keys = %w[id name]
      expect(company_response.keys).to contain_exactly(*expected_keys)
    end
  end
end
