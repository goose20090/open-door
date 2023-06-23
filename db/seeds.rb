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
  start_time = rand(9..16) # Generate random integer between 9 and 16
  status = status_list.sample
  date = if i.even?
    nil # For recurring appointments, date is nil
  else
    (1..30).to_a.sample.days.from_now.to_date # Random date within one month from now (not including today)
  end
  # status = status_list[i % status_list.length] # Rotate through status_list

  Appointment.create!(
    client_id: clients[i % clients.size].id,
    # therapist_id: 21,
    therapist_id: therapists[i % therapists.size].id,
    start_time: start_time,
    status: status,
    recurring: i.even?, # Alternating between recurring and non-recurring appointments
    date: date,
    week_day: i.even? ? i % 7:  nil  # Assuming week_day is 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  )
end