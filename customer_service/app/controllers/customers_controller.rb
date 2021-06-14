# frozen_string_literal: true

class CustomersController < ApplicationController
  def index
    render json: customer_results
  end

  private

  def customer_results
    search_param = query_params[:search]
    company_id = query_params[:company_id]

    # Select which queries to chain
    queries = [:all]
    queries << [:search_by_full_name, search_param] if search_param
    queries << [:where, { company_id: company_id }] if company_id

    # Apply queries to Customer model
    queries.inject(Customer) { |model, method| model.send(*method) }
  end

  def query_params
    params.permit(:search, :company_id)
  end
end
