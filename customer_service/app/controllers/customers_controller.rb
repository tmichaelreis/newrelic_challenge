class CustomersController < ApplicationController
  def index
    render json: customer_results
  end

  private

    def customer_results
      search_param = query_params[:search]

      # Select which queries to chain
      queries = [:all]
      queries << [:search_by_full_name, search_param] if search_param

      # Apply queries to Customer model
      queries.inject(Customer) { |model, method| model.send(*method) }
    end

    def query_params
      params.permit(:search)
    end
end
