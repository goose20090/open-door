# # Clear previous data
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

# Define appointment status list
status_list = ['pending', 'confirmed', 'rejected']
clients = Client.all

# Create appointments
20.times do |i|
  start_time = rand(9..16) # Generate a random integer between 9 and 16
  status = status_list.sample

  week_day = 1 + i % 5 # Generate week_day value between 1 (Monday) and 5 (Friday)
  today = Date.today
  next_desired_day = (week_day - today.wday) % 7
  date = today + next_desired_day.days

  # Adjust date for non-recurring appointments, ensuring they start in more than a week
  date += 1.week unless i.even?

  Appointment.create!(
    client_id: clients[i % clients.size].id,
    therapist_id: therapists[i % therapists.size].id,
    start_time: start_time,
    status: status,
    recurring: i.even?, # Alternating between recurring and non-recurring appointments
    date: date,
    week_day: week_day # week_day matches day of week of the date
  )
end