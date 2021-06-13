require 'rails_helper'

RSpec.describe 'Customers API', type: :request do
  describe 'customers index' do
    before do
      create_list(:customers, 5)
    end

    it 'returns a success' do
      get '/customers'
      expect(response).to have_http_status :ok
    end
    
    it 'returns customers' do
      get '/customers'
      expect(json_body.keys).to contain_exactly('customers')
    end

    it 'returns all customers' do
      get '/customers'
      returned_customer_ids = json_body['customers'].map { |customer| customer['id'] }
      expect(returned_customer_ids).to contain_exactly(Customer.all.map(&:id))
    end

    it 'returns customer data in the correct shape' do
      get '/customers'
      customer_response = json_body['customers'].first
      expected_keys = ['first_name', 'last_name', 'company_name']
      expect(customer_response.keys).to contain_exactly(expected_keys)
    end

    context 'with search param' do
      let!(:customer) { create(:customer, first_name: 'Test', last_name: 'Customer') }
      let(:returned_customer_ids) do
        json_body['customers'].map { |customer| customer['id'] }
      end

      it 'searches customers by exact first name' do
        get '/customers', params: { search: 'Test' }
        expect(returned_customer_ids).to contain(customer.id)
      end

      it 'ignores case on first name search' do
        get '/customers', params: { search: 'tEst' }
        expect(returned_customer_ids).to contain(customer.id)
      end

      it 'searches customers by last name' do
        get '/customers', params: { search: 'Customer' }
        expect(returned_customer_ids).to contain(customer.id)
      end

      it 'ignores case on last name search' do
        get '/customers', params: { search: 'cUstomer' }
        expect(returned_customer_ids).to contain(customer.id)
      end
    end

    context 'with company filter' do
      let(:company) { create(:company, name: 'New Relic') }
      let!(:company_customer) { create(:customer, company: company) }

      let(:returned_customer_ids) do
        json_body['customers'].map { |customer| customer['id'] }
      end

      it 'returns company customers' do
        get '/customers', params: { company_name: 'New Relic' }
        expect(returned_customer_ids).to contain_exactly(company_customer.id)
      end

      it 'returns no customers if none match company filter' do
        get '/customers', params: { company_name: 'Another Company' }
        expect(returned_customer_ids).to be_empty
      end
    end
  end
end
