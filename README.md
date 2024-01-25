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
5. Delete credentials.yml.enc in config file.

6. Add in devise JWT Secret Key
```bash
Copy code
rails credentials:edit
rails secret
EDITOR=nano rails credentials:edit
```
Copy and add the secret in. Ensure that you don't use tab and use two spacebars.
```bash
# aws:
#   access_key_id: 123
#   secret_access_key: 345

# Used as the base secret for all MessageVerifiers in Rails, including the one protecting cookies.
secret_key_base: f03520e50eb5f022fba6d94246772c12f49240cee256ff4ca29a444e6123e4ca3195c28a20be72444ba6092f5904836a422338227016c94ec8c281fe1a230f40

devise:
  jwt_secret_key: <PASTE SECRET KEY HERE>
```

7. Start the Rails Server
Ensure that the server is hosted on localhost:3000.

```bash
Copy code
rails s
```
8. Install Frontend Dependencies
Open a new terminal, navigate to the frontend directory, and install the frontend dependencies.

```bash
Copy code
cd frontend
npm install --force
```
9. Start the Frontend
Run the following command to start the frontend.

```bash
Copy code
npm start
```
Usage

Visit http://localhost:3001 in your browser to access the application. Explore and enjoy the features of CVWO Groomers & Reviewers!

Feel free to contribute and provide feedback. Happy grooming! 🐾
