# Clear previous data
Appointment.delete_all
Feedback.delete_all
User.delete_all
Client.delete_all
Therapist.delete_all

# Create clients
clients = 10.times.map do
  client = Client.create!(
    name: Faker::Name.name,
    created_at: Faker::Time.between(from: 6.months.ago, to: Date.today),
    updated_at: Faker::Time.between(from: 6.months.ago, to: Date.today)
  )

  User.create!(
    email: Faker::Internet.email,
    password_digest: BCrypt::Password.create('abc'),
    userable: client
  )

  client
end

# Create therapists
therapists = 5.times.map do
  therapist = Therapist.create!(
    name: Faker::Name.name,
    created_at: Faker::Time.between(from: 6.months.ago, to: Date.today),
    updated_at: Faker::Time.between(from: 6.months.ago, to: Date.today)
  )

  User.create!(
    email: Faker::Internet.email,
    password_digest: BCrypt::Password.create('abc'),
    userable: therapist
  )

  therapist
end