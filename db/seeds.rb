# Clear previous data
Appointment.delete_all
User.delete_all
Client.delete_all
Schedule.delete_all
Notification.delete_all
Therapist.delete_all

# Create clients
clients = 10.times.map do |i|
  client = Client.create!(
    name: Faker::Name.name,
    created_at: Faker::Time.between(from: 6.months.ago, to: Date.today),
    updated_at: Faker::Time.between(from: 6.months.ago, to: Date.today)
  )

  User.create!(
    email: "client#{i + 1}@test.com",
    password_digest: BCrypt::Password.create('abc'),
    userable: client
  )

  client
end

# Create therapists
therapists = 5.times.map do |i|
  therapist = Therapist.create!(
    name: Faker::Name.name,
    biography: Faker::Lorem.paragraph_by_chars(number: 250, supplemental: false),
    created_at: Faker::Time.between(from: 6.months.ago, to: Date.today),
    updated_at: Faker::Time.between(from: 6.months.ago, to: Date.today)
  )

  User.create!(
    email: "therapist#{i + 1}@test.com",
    password_digest: BCrypt::Password.create('abc'),
    userable: therapist
  )

  therapist
end

# Define appointment status list
status_list = ['pending', 'confirmed', 'rejected']

# Create appointments
20.times do |i|
  begin
    start_time = rand(9..16) # Generate a random integer between 9 and 16
    status = status_list.sample

    week_day = 1 + i % 5 # Generate week_day value between 1 (Monday) and 5 (Friday)
    today = Date.today
    next_desired_day = (week_day - today.wday) % 7
    date = (today + next_desired_day.days).to_datetime.change({ hour: 12 })

    # Adjust date for non-recurring appointments, ensuring they start in more than a week
    date += 1.week unless i.even?

    if i.even? # For recurring appointments
      # Generate a random number of days between 1 and 30
      days_in_past = rand(1..30)
      date -= days_in_past.days
    end

    appointment = Appointment.new(
      client_id: clients[i % clients.size].id,
      therapist_id: therapists[i % therapists.size].id,
      start_time: start_time,
      status: status,
      recurring: i.even?, # Alternating between recurring and non-recurring appointments
      date: date,
      week_day: week_day, # week_day matches day of week of the date
      seeding: true
    ).save!

  rescue ActiveRecord::RecordInvalid => invalid
    puts invalid.record.errors
    retry
  end
end