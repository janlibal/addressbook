## AddressBook API

#### 1.	Overview
The AddressBook API serves as a backend API for mobile applications and websites. User storage is managed by MongoDB while contacts storage by Firebase.

#### 2. Ports
- the API runs on port 8080 for both development and production environment.

#### 3.	Endpoints

**/test**
- Through this endpoint you may check that the API is live by getting a message "Hello world". **"localhost:8080/test"**

**/auth/register**
- Register a new user by sending a username and a password in JSON format. The input is validated. Both username and password are required. If passed, freshly registered user is stored in the database and issued a JWT token.

**/auth/login**
-	Login an already registered user by sending their username and password in JSON format. The input is validated. Both username and password are required. If passed and after a successful credentials verification, the user is issued a JWT token.

**/address/new**
-	Create a new contact by sending required fields (First name, Last name, Phone and Address) in JSON format. In order to create a new contact, the user has to be logged in. The input is validated. If passed, the contact is stored in the Firebase database.

#### 4.	Environment

- Development environment – before running the project locally, it is required to have Docker installed. Open the project and from the project terminal window, run **“docker-compose up -d”** to start storage containers on your local machine. Make sure to have all packages related to the project ready – from your project terminal window run **“npm i”** to do so. Open your .env file and check the value of NODE_ENV key which for local run is set to **development**. This will direct all the necessities to run the project in local environment. Run **“npm run build”** in order to build the app and **“npm run dev”** to launch the application.

- Production environment – when running the project from local environment with the need for connection into the Atlas DB, first check installed packages by **“npm i”** ran from your project terminal window. In .env file, check the value of NODE_ENV key which for production run is set to production. Build the project by **“npm run build”** and for the application launch use **“npm run start”**.

