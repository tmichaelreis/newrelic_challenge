FactoryBot.define do
  factory :customer do
    company
    first_name { FFaker::Name.first_name }
    last_name { FFaker::Name.last_name }
  end
end
