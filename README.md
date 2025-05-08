# Social Media Feed App with React and Firebase

A modern social media feed application built with React and Firebase, allowing users to create accounts, create posts, and interact through comments.

## Project Description

This application provides a platform for users to connect and share content in a social media-like environment. It features a clean, responsive interface with real-time updates powered by Firebase. Users can create accounts, create posts with text and images, comment on posts, and manage their content.


## Live

- Demo https://osmanbey918.github.io/feedsApp-with-firebase

## Main Features

- **User Authentication**
  - Email and password-based signup/login
  - Protected routes for authenticated users
  - User profile management

- **Post Management**
  - Create posts with text and images
  - Real-time feed updates
  - Delete own posts
  - Image upload functionality

- **Social Interaction**
  - Comment on posts
  - View user profiles
  - Real-time comment updates
  - Like posts (UI ready)

- **Modern UI/UX**
  - Responsive design
  - Modal-based interactions
  - Clean and intuitive interface
  - Loading states and error handling

## Technologies Used

- **Frontend**
  - React 18
  - React Router DOM v6
  - Redux Toolkit for state management
  - CSS3 for styling

- **Backend/Services**
  - Firebase Authentication
  - Firebase Firestore (database)
  - Firebase Storage (for images)
  - Firebase Hosting (for deployment)

- **Development Tools**
  - Create React App
  - npm for package management
  - Git for version control

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone [https://github.com/osmanbey918/feedsApp-with-firebase.git]
   cd social-with-firebase
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password), Firestore, and Storage
   - Copy your Firebase configuration
   - Update/create the configuration in `src/config/firebaseConfig.js`

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Create an account using the signup page
2. Log in with your credentials
3. Create posts using the "Create Post" button
4. View posts in the feed
5. Comment on posts by clicking the comment button
6. Delete your own posts using the delete button
7. Log out using the logout button in the profile section

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact Information

For any questions or suggestions, please reach out:

- **GitHub**: [https://github.com/osmanbey918]
- **Email**: [usman918khan@gmail.com]
- **LinkedIn**: [https://www.linkedin.com/in/muhammad-usman-429b362a5/]

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
