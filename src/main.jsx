import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from '../src/pages/Home.jsx'
import { Login, AuthLayout } from './components/index.js'
import AddPost from '../src/pages/AddPost.jsx'
import AllPosts from '../src/pages/AllPosts.jsx'
import EditPost from '../src/pages/EditPost.jsx'
import Post from '../src/pages/Post.jsx'
import Signup from '../src/pages/Signup.jsx'
import Profile from '../src/pages/Profile.jsx'
import { ThemeProvider } from "@material-tailwind/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: <AllPosts />,
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />
      },
      {
        path: "/add-post",
        element:( 
        <AuthLayout>
          {" "}
        <AddPost />
        </AuthLayout>
        )
      },
      {
        path: "/profile/:userId/:secret",
        element:( 
        // <AuthLayout>
        <Profile />
        //  </AuthLayout>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
