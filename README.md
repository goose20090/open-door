# Open Door

Open Door is a React and Rails-based application that utilizes React Query for efficient data fetching. The application offers a platform for clients and therapists to manage appointments. Therapists and clients can conveniently book, reschedule, confirm, or cancel appointments. Therapists can also limit their availability in a customised schedule.

Open Door ensures only valid appointments are offered to both clients and therapists. In addition, it features a rollback functionality for cancelled reschedule requests, ensuring a smooth user experience and minimizing the potential for scheduling conflicts.

The application is currently deployed at https://open-door.onrender.com.

A walkthrough for this application can be found [here](https://www.loom.com/share/9d206a9fbb194666bbd820fde90930e1).

## Features

- **Client Features**

  - Request, reschedule, confirm, or cancel appointments.
  - Intelligent validation system to prevent invalid appointment scheduling.

- **Therapist Features**

  - Confirm, reject, or reschedule appointments.
  - Manage schedules.
  - Cancel appointments.

- **Common Features**
  - Rollback functionality for cancelled reschedule requests.
  - Notification system for both therapists and clients.

## Setup

### Prerequisites

- Ruby 3.0
- Rails 7.0
- Node.js 14+
- Postgres 13+

### Installation

1. Clone the repository and navigate to it:
   ```sh
   git clone https://github.com/goose20090/open-door.git && cd opendoor
   ```
2. Install Rails and JavaScript dependencies:
   ```sh
   bundle install && npm install --prefix client
   ```
3. Setup the database:
   ```sh
   rails db:create db:migrate
   ```
4. Start the Rails server and the frontend server:
   `rails s`
   In a new terminal window:
   `npm run dev --prefix client`

5. Navigate to `http://localhost:3000` in web browser.

## Acknowledgements

[Undraw Open-source Illustrations](https://undraw.co/), by Katerina Limpitsouni
