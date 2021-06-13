# frozen_string_literal: true

class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :company_name
end
