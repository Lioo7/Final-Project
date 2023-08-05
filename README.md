<h1 align="center">People's Budget :dollar:</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white" alt="Pandas">
  <img src="https://img.shields.io/badge/NumPy-013243?style=flat&logo=numpy&logoColor=white" alt="NumPy">
  <img src="https://img.shields.io/badge/pytest-0A9EDC?style=flat&logo=pytest&logoColor=white" alt="pytest">
  <img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/Statistics-FF8000?style=flat&logo=python&logoColor=white" alt="Statistics">
  <img src="https://img.shields.io/badge/Selenium-43B02A?style=flat&logo=selenium&logoColor=white" alt="Selenium">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white" alt="React">
</p>

<p align="center">
  <img src="https://i.ibb.co/CHx5btZ/cover-auto-x2-colored-toned-light-ai.jpg" width="600" title="hover text">
</p>

## Table of Contents

- [Project Goal](#project-goal)
- [Introduction](#introduction)
- [Key Features](#key-features)
- [Selected Approach](#selected-approach)
  - [Architecture and Design Pattern](#architecture-and-design-pattern)
  - [Application Structure](#application-structure)
  - [Algorithms](#algorithms)
  - [UX & UI](#ux--ui)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
     - [Environment Variable Configuration](#environment-variable-configuration)
        - [Linux](#linux)
        - [macOS](#macos)
        - [Windows](#windows)
- [Testing](#testing)
- [User Guide](#user-guide)
  - [Getting Started](#getting-started)
  - [Navigating the Application](#navigating-the-application)
  - [Revoting](#revoting)
  - [Additional Features](#additional-features)
- [License](#license)
- [Contributing](#contributing)
- [Team Information](#team-information)

## Project Goal

The goal of our web application is to enable citizens to actively participate in the voting process for the state/municipality budget, ensuring alignment with the will of the people. We aim to address the lack of influence and disconnection that citizens often feel regarding how their taxes are utilized. By providing an intuitive and transparent platform, we empower individuals to have a direct impact on budget decisions.

## Introduction

Are you tired of feeling like your voice doesn't matter when it comes to budget decisions? Do you want to have a say in how your taxes are spent? Look no further! The People's Budget web application is here to revolutionize citizen participation. With our platform, you can actively engage in the voting process for state and municipal budgets, making your opinions count. We believe in the power of collective decision-making and strive to create a more inclusive and democratic society.

## Key Features

- **Online Voting for Budget Proposals**: Our web application allows users to vote online for the budget proposal. 
- **Revoting Capability for Updated Decisions**: Our system enables users to revise their votes accordingly.
- **Real-time Result Tracking for Transparency**: Transparency is crucial to us. We provide real-time tracking of voting results, allowing citizens to stay informed about the progress and outcomes of budget decisions.
- **Comprehensive Voter Statistics Dashboard**: To encourage informed participation, we offer a comprehensive voter statistics dashboard. It provides insights into the overall voting trends, demographics, and other relevant data.

## Selected Approach

To ensure modularity, scalability, and maintainability, we adopted a layered architecture approach. The system consists of three essential components: the presentation layer (client), application layer (server), and the data layer (database).

### Architecture and Design Pattern

To facilitate seamless communication between the client and server, we employ a client-server pattern with RESTful APIs. This architecture enables efficient data exchange and supports a smooth user experience. Additionally, we utilize the strategy pattern to ensure flexible interaction between the server and database. The system architecture is robust and scalable, with clear component separation for easier maintenance and future enhancements.

### Application Structure

- **Client**: The client-side of our application is built using JavaScript and the React library. This choice ensures an optimal user experience, with responsive and interactive interfaces.
- **Server**: The server-side logic and information services are implemented using Python and the Flask library. This combination allows for efficient processing and handling of requests.
- **Database**: We utilize MySQL as the database management system, providing robust and reliable storage for our application data.

### Algorithms

Our web application incorporates powerful algorithms to guarantee fairness, truth-telling, and anonymity in the voting process. These algorithms are designed to ensure that every vote is counted accurately and that user privacy is protected.

### UX & UI

User experience and user interface design are essential aspects of our project. We prioritize simplicity and ease of use, ensuring that citizens of all technical backgrounds can navigate the application effortlessly. Our design philosophy revolves around creating an intuitive interface that encourages active participation. We also provide a Guest Mode that allows users to explore the system before signing up.

## Getting Started

### Prerequisites

To run the People's Budget web application, you need to have the following installed on your system:

- Docker (23.0.5)
- Python (3.11.0)
- Node.js (18.13.0)

### Installation

To set up the People's Budget web application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/ElhaiMansbach/Final-Project`
2. Navigate to the project directory: `cd Final-Project`
3. Install the required Python dependencies: `pip install -r requirements.txt`
4. Navigate to the client directory: `cd src/client`
5. Install the required npm dependencies: `npm install`
6. Set up the necessary environment variables.

#### Environment Variable Configuration

To configure the required environment variables:
* 'user_budget_system': This variable represents the desired username for the budget system, which can be used to authenticate and identify the user within the system.
* 'system_budget_password': This variable represents the password for the budget system user, which is required for authentication and accessing the budget system's functionalities.
* 'MYSQL_ROOT_PASSWORD': This variable represents the desired password for the MySQL root user, which is the highest level of access to the MySQL database system. 

##### Linux

For Linux users, you can refer to [this tutorial](https://www.youtube.com/watch?v=Y6_7xaxkPik) on setting environment variables.

##### MacOS

For Mac users, you can refer to [this tutorial](https://www.youtube.com/watch?v=dl_jgYr0rxU) on setting environment variables.

##### Windows

For Windows users, you can refer to [this tutorial](https://www.youtube.com/watch?v=ow2jROvxyH4) on setting environment variables.

After defining the environment variables using the instructions above, continue with the installation steps:
<br>5. Run the MySQL database using Docker Compose by navigating to the database directory and running the command: `docker-compose up -d`.
<br>6. To initialize the database, run the command: `python sql_Initialization.py`.
<br>7. Start the server by navigating to the server directory and running the command: `python app.py`.
<br>8. On a new terminal, start the client by navigating to the client directory and running the command: `npm start`.
<br>9. Open the client-side application in your web browser: `http://localhost:5000`.
<br>10. You're ready to actively participate in the budget voting process!

## Testing

The project includes a dedicated test directory with subdirectories for client and server tests. These tests are designed to ensure the functionality and reliability of the application components. 

To execute the tests, follow these steps:

1. **Client Tests**:
   - Navigate to the `test/client` directory.
   - Install the required npm dependencies by running the command:
     ```bash
     npm install
     ```
   - Download and install a ChromeDriver that corresponds to your browser from [here](https://chromedriver.chromium.org/downloads).
   - Run the command to execute the client-side tests:
     ```bash
     npm run tests
     ```

   This command will run all the tests.

   To run a specific test, use the following command, replacing `"test name"` with the desired test name:
   ```bash
   node RunAllTests.js "test name"
   
2. **Server Tests**: Navigate to the `test/server` directory and run the command to execute the server-side tests:
   `pytest`
   
## User Guide

### Getting Started

1. **Accessing the Web Application**: Open your web browser and enter the URL of the People's Budget application.
2. **Creating an Account**: Click on the "Sign Up" button and follow the on-screen instructions to create your account.

   ![Create account](https://i.ibb.co/LSxsWWH/Create-account.png)

3. **Logging In**: After creating your account, click on the "Log In" button and enter your credentials to access the system.

   ![Log In](https://i.ibb.co/gS5ZK2V/log-in.png)

### Navigating the Application

1. **Home page**: Upon logging in, you will be redirected to the user page home. This is where you can find...

   ![Home](https://i.ibb.co/QFnrF0Q/home.png)

2. **Voting**: To vote for a budget proposal, click on the "Vote" button next to... A confirmation prompt will appear, and you can submit your vote by clicking "Confirm".

   ![Vote](https://i.ibb.co/fDFWZjQ/voting.png)

3. **Result Tracking**: You can track the real-time results of the voting process by accessing the "Results" section. Here, you will find visualizations and updates on the progress and outcome of the budget vote.


   ![Results](https://i.ibb.co/px81PKF/results.png)

4. **Dashboard - Voter Statistics**: Explore the comprehensive voter statistics dashboard to gain insights into the voting trends, demographics, and other relevant data. 

Use this information to make informed decisions and understand the overall participation patterns.
   ![Dashboard](https://i.ibb.co/W0LqVDk/dashboard.png)

### Revoting

- **Revoting**: If you wish to change your vote.

### Additional Features
- **Guest Mode**: Explore the system and familiarize yourself with the features in the Guest Mode before signing up. This allows you to get a glimpse of the application's functionalities without creating an account.

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial (CC BY-NC) License](https://creativecommons.org/licenses/by-nc-nd/4.0/).

## Contributing

We welcome contributions to the People's Budget project! If you would like to contribute, please follow these guidelines:

1. Fork the repository and create your branch from `main`.
2. Make your desired changes and improvements to the codebase.
3. Ensure that your code adheres to the project's coding style and conventions.
4. Test your changes thoroughly to ensure they function as intended.
5. Commit your changes with clear and descriptive commit messages.
6. Push your changes to your forked repository.
7. Submit a pull request, detailing the changes you have made.

We will review the pull request and provide feedback or merge it into the main codebase if appropriate. We appreciate your contributions and look forward to collaborating with you!

Please note that by contributing to this project, you agree to license your contributions under the [Creative Commons Attribution-NonCommercial (CC BY-NC) License](https://creativecommons.org/licenses/by-nc-nd/4.0/). Your contributions must align with the license terms and restrictions.

If you have any questions or need further assistance with the contribution process, feel free to reach out to us.

## Team Information
This project was developed by:
<table align = "center">
  <tr>
    <td align="center"><a href="https://github.com/ElhaiMansbach"><img src="https://i.ibb.co/tsyV1FL/elhai-photo.jpg" width="150px;" alt=""/><br /><sub><b>Elhai Mansbach</b></sub></a><br /> </td>
    <td align="center"><a href="https://github.com/OfirOvadia96"><img src="https://i.ibb.co/cCzmpV6/ofir-ovadia.jpg" width="150px;" alt=""/><br /><sub><b>Ofir Ovadia</b></sub></a><br /> </td>
    <td align="center"><a href="https://github.com/Lioo7"><img src="https://i.ibb.co/2MCYM0m/lioz-photo.jpg" width="150px;" alt=""/><br /><sub><b>Lioz Akirav</b></sub></a><br /> </td>
  </tr>
</table>
Under the supervision of <a href="https://github.com/erelsgl">Dr. Erel Segal Halevi</a>.
