# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Generate random data
10.times do
  Company.create({ name: FFaker::Company.name })
end

100.times do
  Customer.create({ first_name: FFaker::Name.first_name,
                    last_name: FFaker::Name.last_name,
                    company_id: Company.pluck(:id).sample })
end

## Warning: this data is used for integration testing
new_relic = Company.create({ name: 'New Relic' })
la_sportiva = Company.create({ name: 'La Sportiva' })

Customer.create({ first_name: 'Tom', last_name: 'Reis', company: new_relic })
Customer.create({ first_name: 'Adam', last_name: 'Ondra', company: la_sportiva })
Customer.create({ first_name: 'Brooke', last_name: 'Raboutou', company: la_sportiva })
###
