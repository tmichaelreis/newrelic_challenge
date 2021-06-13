class CustomersController < ApplicationController
  def index
    render json: Customer.all
  end
end
