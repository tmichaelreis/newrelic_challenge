# frozen_string_literal: true

module RequestHelpers
  def json_body
    # Convenience method to access parsed response body
    JSON.parse(response.body)
  end
end
