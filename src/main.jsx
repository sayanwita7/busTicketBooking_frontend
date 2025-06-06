import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.css'
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Buses from './pages/Buses.jsx'
import BusDisplayComponent from './pages/BusLayout.jsx'
import AllUserTicket from './pages/UserTickets.jsx'
import Payment from './pages/Payment.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/buses",
        element: <Buses />,
      },
      {
        path: "/buses-seats",
        element: <BusDisplayComponent />,
      },
      // {
      //   path: "/tickets",
      //   element: <TicketDisplayComponent />,
      // },
      {
        path: "/all-user-tickets",
        element: <AllUserTicket />,
      },
      {
        path: "/payment",
        element: <Payment />,
      }
    ]
  }
])

ReactDOM.createRoot (document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
)
