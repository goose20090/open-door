# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
10.times do
    Client.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
      password_digest: BCrypt::Password.create('abc'),
      created_at: Faker::Time.between(from: 6.months.ago, to: Date.today),
      updated_at: Faker::Time.between(from: 6.months.ago, to: Date.today)
    )
  end
  
  # Create therapists
  5.times do
    Therapist.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
      password_digest: BCrypt::Password.create('abc'),
      created_at: Faker::Time.between(from: 6.months.ago, to: Date.today),
      updated_at: Faker::Time.between(from: 6.months.ago, to: Date.today)
    )
  end
  
  # Create appointments
  30.times do
    start_time = Faker::Time.between(from: 1.month.ago, to: 1.month.from_now)
    status = ['confirmed', 'pending', 'cancelled'].sample
  
    Appointment.create!(
      client_id: Client.pluck(:id).sample,
      therapist_id: Therapist.pluck(:id).sample,
      start_time: start_time,
      status: status,
      created_at: start_time - 1.day,
      updated_at: start_time - 1.day
    )
  end
  
  # Create feedbacks
  30.times do
    content = Faker::Lorem.sentence(word_count: 10)
    rating = rand(1..5)
  
    Feedback.create!(
      appointment_id: Appointment.pluck(:id).sample,
      content: content,
      rating: rating,
      created_at: Faker::Time.between(from: 6.months.ago, to: Date.today),
      updated_at: Faker::Time.between(from: 6.months.ago, to: Date.today)
    )
  end