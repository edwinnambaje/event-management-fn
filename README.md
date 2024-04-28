# Event Management Platform

Welcome to the Event Management Platform! This web application allows users to browse upcoming events, book tickets, and manage their bookings. Administrators have access to an admin dashboard for event management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Requirements](#project-requirements)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### Event Listing and Details

- Display a list of upcoming events organized by the company.
- Show essential details for each event, including title, date, location, and ticket availability.

### Booking Tickets

- Allow users to select the number of tickets they wish to book for an event.
- Implement a simple booking process.

### User Dashboard

- Provide users with a dashboard where they can view their booked events.
- Allow users to cancel their bookings if needed.

### Admin Dashboard

- Create a separate admin dashboard accessible only to company administrators.
- Allow admins to manage events, including creating new events, editing event details, and deleting events if necessary.
- Provide functionality for admins to view all bookings and manage them (e.g., cancel bookings, view attendee details).

### Basic Styling and UI/UX

- Apply a simple and clean design using Tailwind CSS to ensure a consistent look and feel across the platform.
- Focus on usability and intuitive navigation to enhance the user experience.

### Error Handling and Validation

- Implement basic error handling and validation for user inputs (e.g., form submissions).
- Provide informative error messages to guide users in case of invalid actions.

## Tech Stack

This project is built using the PERN (PostgreSQL, Express.js, React.js, Node.js, Sequelize) stack.

## Project Requirements

- Implement the specified features using the chosen stack.
- Ensure the project meets the provided requirements and functionalities.
- Aim for clean, readable, and well-organized code.
- Provide documentation as needed for setup and usage.

## Getting Started

To get started with the Event Management Platform, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install` in the root directory.
4. Set up your environment variables (database connection, API keys, etc.).
5. Run the development server by executing `npm start` or `npm run dev`.
6. Access the application in your web browser at `http://localhost:3000`.

## Usage

- Browse upcoming events on the homepage.
- Click on an event to view its details and book tickets.
- Log in as an administrator to access the admin dashboard.
- Log in as a user to access User dashboard
- Manage events, bookings, and other functionalities from the admin dashboard.

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
