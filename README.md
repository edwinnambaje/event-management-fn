# Event Management API


## Description

Event Management API is an API will carry operations mainly of creating events, allowing different users to book events available in the system. The API uses Json Web Token (JWT) to authorise  users to access or carry out operations based on their role in the system.


## Technologies Used

The following are the technologies which have been used in this API with their URLs

- Postgres
- Docker: https://www.docker.com/
- NodeJs: https://nodejs.org/en
- Typescript: https://www.typescriptlang.org/


## Service local development
The service demonstrates different operation of Event, Booking and Users (CRUD operation) using ExpressJs.

* To set up the service

Create a `.env` file with at least the following variables as per `.env.example`:
* NODE_BACKEND_URL = `You indicate the URL of the backend

Install required packages
```bash
npm install
```

Start the service:
```bash
npm run dev
```

This script starts the application in the development mode, consult `package.json` to learn more about scripts


* Now you can open your browser and interact with these URLs:

API JSON based web API based on OpenAPI: http://localhost:3000
Note that the 4000 is the default port, replace it with the port you chose if you have passed a different one in your `vite.config.ts` file

## Functionalities Working
- User can create an account
- User can login
- Admin can create an event
- User can view all events
- User can book an event
- User can view his/her bookings on dashboard
- Admin can view all bookings
- Admin can view all users
- Admin can view all events
- Admin can cancel a booking
- Admin can delete an event
- Admin can delete a user

## Credentials for admin
- email: nambajedwin@gmail.com
- password: 123@Pass

## Event Management Platform
[Here](https://github.com/edwinnambaje/event-bn) is the link to the backend of the Event Management Platform.

## Author and Acknowledgement
Nambaje Edwin