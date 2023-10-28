
# PersonaBlog

**PersonaBlog** is a blog website that allows users to create accounts, log in, and share their experiences and knowledge by writing and publishing blog posts. The project is built using React.js, Appwrite, and Tailwind CSS for a smooth and visually appealing user experience. It utilizes React Router for page navigation and integrates Tiny Cloud as a rich text editor to enable users to create well-structured blog content with features like paragraphs, styling, images, font-bold, and more. User data and blog posts are efficiently managed and retrieved using Redux stores, specifically `authSlice` and `postSlice`, reducing the need for constant database queries.

## Features

- **User Authentication**: PersonaBlog implements a user authentication system that includes email verification, ensuring secure user access.

- **Blog Creation**: Registered users can create and publish their blog posts with ease.

- **Home Page**: The home page displays a feed of blogs, including recent ones, accessible to all visitors.

- **All Posts**: The "All Posts" page offers a comprehensive list of all blogs uploaded by users, available to the public.

- **Add Post**: Users can compose and submit new blog posts from the "Add Post" page, which is only accessible to authenticated users.

- **Post Management**: Users who own a blog post have the option to edit and delete their posts for complete control.

- **Password Recovery**: Password recovery functionality is in place to assist users in regaining access to their accounts.

## Technologies Used

- React.js: A popular JavaScript library for building user interfaces.

- Appwrite: An open-source platform for building web and mobile applications, providing authentication, database, and storage services.

- Tailwind CSS: A utility-first CSS framework that makes styling web applications efficient.

- React Router: Used for client-side routing, enabling seamless navigation between different sections of the application.

- Tiny Cloud: Integrated as a rich text editor for creating and formatting blog posts.

- Redux: State management library for maintaining user and blog post data.

- HTML-React-Parser: Utilized to parse HTML content into a readable format.

## Getting Started

To run PersonaBlog locally and start working on it, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/PersonaBlog.git
2. Navigate to the project directory:
   cd PersonaBlog
3. Install the project dependencies:
   npm install
4. Configure Appwrite:

You will need to set up your Appwrite instance and configure the project to use it. Refer to the documentation for instructions on how to set up Appwrite and update the project's configuration accordingly.
5. Run the development server:
  npm run dev
6. Open your web browser and visit http://localhost:3000 to see PersonaBlog in action.

