require 'rails_helper'

RSpec.describe 'Customers API', type: :request do
  describe 'customers index' do
    context 'no params' do
      before do
        FactoryBot.create_list(:customer, 5)
      end

      it 'returns a success' do
        get '/customers'
        expect(response).to have_http_status :ok
      end

      it 'returns all customers' do
        get '/customers'
        returned_customer_ids = json_body.map { |customer| customer['id'] }
        expect(returned_customer_ids).to contain_exactly(*Customer.all.map(&:id))
      end

      it 'returns customer data in the correct shape' do
        get '/customers'
        customer_response = json_body.first
        expected_keys = ['id', 'first_name', 'last_name', 'company_name']
        expect(customer_response.keys).to contain_exactly(*expected_keys)
      end
    end

    context 'with search param' do
      let!(:customer) do
        FactoryBot.create(:customer, first_name: 'Test', last_name: 'Customer')
      end

      let!(:other_customer) do
        FactoryBot.create(:customer, first_name: 'No', last_name: 'Match')
      end

      let(:returned_customer_ids) do
        json_body.map { |customer| customer['id'] }
      end

      it 'searches customers by exact first name' do
        get '/customers', params: { search: 'Test' }
        expect(returned_customer_ids).to contain_exactly(customer.id)
      end

      it 'ignores case on first name search' do
        get '/customers', params: { search: 'tEst' }
        expect(returned_customer_ids).to contain_exactly(customer.id)
      end

      it 'searches customers by last name' do
        get '/customers', params: { search: 'Customer' }
        expect(returned_customer_ids).to contain_exactly(customer.id)
      end

      it 'ignores case on last name search' do
        get '/customers', params: { search: 'cUstomer' }
        expect(returned_customer_ids).to contain_exactly(customer.id)
      end
    end

    context 'with company filter param' do
      let(:company) { FactoryBot.create(:company, name: 'New Relic') }
      let!(:company_customer) { FactoryBot.create(:customer, company: company) }
      let!(:other_customer) { FactoryBot.create(:customer) }

      let(:returned_customer_ids) do
        json_body.map { |customer| customer['id'] }
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

    context 'with company filter and name search params' do
      let(:company) { FactoryBot.create(:company, name: 'New Relic') }
      let!(:matching_customer) do
        FactoryBot.create(:customer, first_name: 'Tom', company: company)
      end

      let!(:same_name_customer) do
        FactoryBot.create(:customer, first_name: 'Tom')
      end

      let!(:same_company_customer) do
        FactoryBot.create(:customer, first_name: 'Janja', company: company)
      end

      let(:returned_customer_ids) do
        json_body.map { |customer| customer['id'] }
      end

      it 'returns only matching customers' do
        get '/customers', params: { company_name: 'New Relic', search: 'Tom' }
        expect(returned_customer_ids).to contain_exactly(matching_customer.id)
      end
    end
  end
end
