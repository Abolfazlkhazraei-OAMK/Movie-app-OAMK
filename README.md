# Cinema App

## Project Description
Cinema App is a web application designed for movie enthusiasts, offering features to explore movies, showtimes, and reviews. The application integrates open-source data from TMDB (The Movie Database) and Finnkino, providing detailed movie information and up-to-date showtimes in Finland. The goal was to create an intuitive and feature-rich platform where users can interact with cinema content, join movie discussion groups, and manage their favorite movies. This project was developed as part of the Advanced Web Applications course at Oulu University of Applied Sciences.

---

## Key Features
- **Responsive Design**: Seamless experience across devices.
- **User Authentication**: Sign-up, Sign-in, and account management.
- **Movie Search**: Advanced search with multiple filters and detailed movie view.
- **Showtime Browsing**: Browse Finnkino showtimes.
- **Group Discussions**: Create and manage collaborative movie discussion groups.
- **Reviews and Ratings**: Submit and view movie reviews and ratings.
- **Favorites List**: Create, manage, and share personalized favorite movie lists.

---

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Data Sources**:
  - TMDB API: For detailed movie information.
  - Finnkino Open Data: For showtime data (XML format).
- **Version Control**: GitHub for collaborative development.
- **Deployment**: Hosted on a public server.

---

## Team Members and Roles
- **Abolfazl Khazraei**: Frontend development and UI design, backend development.
- **Didarul Islam**: Database structure and backend development.
- **Marek Letev**: Backend development.
- **Rasmus Kaikkonen**: Frontend and backend development.
- **Roshan Kandel**: Database management.
- **Shane Widanalage**: Profile page development.

---

## Architecture Overview
### Application Architecture
The application follows a client-server architecture:
- **Frontend**: React handles the user interface and interacts with the backend via REST API.
- **Backend**: Node.js and Express.js process API requests and manage business logic.
- **Database**: PostgreSQL stores user data, reviews, and group information.

### Database Structure
- **Users Table**: Stores user credentials and profiles.
- **Reviews Table**: Stores user-submitted reviews, including ratings and timestamps.
- **Groups Table**: Stores group data and membership information.
- **Favorites Table**: Stores user’s favorite movies.

---

## User Interface Plan
The UI design emphasizes simplicity and functionality. Key pages include:
- **Homepage**: Displays trending movies and search functionality.
- **Movie Details**: Comprehensive details for selected movies.
- **Group Page**: Collaborative space for movie discussions.
- **User Profile**: Displays user favorites and shared links.
- **Login and Register Page**: Allows users to create accounts or log in.

---

## How to Install and Use the Application
### Prerequisites
- Node.js (v16 or later)
- PostgreSQL (v14 or later)
- TMDB API Key (signup required at [TMDB](https://www.themoviedb.org/))

### Installation Steps
1. Clone the repository:
   ```bash
   https://github.com/Abolfazlkhazraei-OAMK/Movie-app-OAMK.git
   cd movie-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the PostgreSQL database using the provided schema.
4. Add your TMDB API key to the `.env` file.
5. Start the development server:
   ```bash
   npm run devStart
   ```
6. Start the application:
   ```bash
   npm run start
   ```
7. Access the application at [http://localhost:3000](http://localhost:3000).

---

## Acknowledgements
Special thanks to Oulu University of Applied Sciences for supporting this project and to the open-source community for the tools and APIs used.

---
