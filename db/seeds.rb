# Clear previous data
Appointment.delete_all
Feedback.delete_all
Client.delete_all
Therapist.delete_all

# Create clients
clients = 10.times.map do
  Client.create!(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    password_digest: BCrypt::Password.create('abc'),
    created_at: Faker::Time.between(from: 6.months.ago, to: Date.today),
    updated_at: Faker::Time.between(from: 6.months.ago, to: Date.today)
  )
end

# Create therapists
therapists = 5.times.map do
  Therapist.create!(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    password_digest: BCrypt::Password.create('abc'),
    created_at: Faker::Time.between(from: 6.months.ago, to: Date.today),
    updated_at: Faker::Time.between(from: 6.months.ago, to: Date.today)
  )
end

# Create appointments
# appointments = 30.times.map do
#   start_time = Faker::Time.between(from: 1.month.ago, to: 1.month.from_now)
#   status = ['confirmed', 'pending', 'cancelled'].sample

#   Appointment.create!(
#     client: clients.sample,
#     therapist: therapists.sample,
#     start_time: start_time,
#     status: status,
#     created_at: start_time - 1.day,
#     updated_at: start_time - 1.day
#   )
# end

# # Create feedbacks
# 30.times do
#   content = Faker::Lorem.sentence(word_count: 10)
#   rating = rand(1..5)

#   Feedback.create!(
#     appointment: appointments.sample,
#     content: content,
#     rating: rating,
#     created_at: Faker::Time.between(from: 6.months.ago, to: Date.today),
#     updated_at: Faker::Time.between(from: 6.months.ago, to: Date.today)
#   )
# end
