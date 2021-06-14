# frozen_string_literal: true

class CompaniesController < ApplicationController
  def index
    render json: Company.all
  end
end
