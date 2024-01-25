# README

# CVWO Groomers & Reviewers

Welcome to the CVWO Groomers & Reviewers project! This application is designed to provide a platform for users to review and rate groomers. Follow the simple installation steps below to get started.

## Installation

1. Clone the Repository

```bash
git clone https://github.com/brendanng7/CVWO-Groomers-Reviewers.git
```
2. Install Backend Dependencies
Navigate to the project directory and install the backend dependencies using Bundler.

```bash
Copy code
cd CVWO-Groomers-Reviewers
bundle install
```
3. Devise Setup
Run the following command to set up Devise.

```bash
Copy code
rails g devise:install
```
In the config/initializers/devise.rb file, add the following code after running rails g devise:install:

```ruby
Copy code
config.jwt do |jwt|
  jwt.secret = Rails.application.credentials.devise[:jwt_secret_key]
end
```
4. Setup the database.
```bash
Copy code
rails db:migrate
```

5. Start the Rails Server
Ensure that the server is hosted on localhost:3000.

```bash
Copy code
rails s
```
6. Install Frontend Dependencies
Open a new terminal, navigate to the frontend directory, and install the frontend dependencies.

```bash
Copy code
cd frontend
npm install --force
```
7. Start the Frontend
Run the following command to start the frontend.

```bash
Copy code
npm start
```
Usage

Visit http://localhost:3001 in your browser to access the application. Explore and enjoy the features of CVWO Groomers & Reviewers!

Feel free to contribute and provide feedback. Happy grooming! 🐾
