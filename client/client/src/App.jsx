//utility imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Layout from './components/Layout'

// display (pages) imports
import DisplayLogin from './views/DisplayLogin'
import DisplayRegister from './views/DisplayRegister'

import DisplayDashboard from './views/DisplayDashboard'

import DisplayLocations from './views/DisplayLocations'
import DisplayCategories from './views/DisplayCategories'
import DisplayAddItem from './views/DisplayAddItem'
import DisplayEditItem from './views/DisplayEditItem'

//AuthProvider stores token and userId in state globally
import { AuthProvider, useAuth } from './context/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*
          Login and register routes.
          '/' to DisplayLogin
          '/register' DisplayRegister
          */}
          <Route path="/" element={<DisplayLogin />} />
          <Route path="/register" element={<DisplayRegister />} />

          {/* <Route element={<Layout />}>
              ....
              <Route/>

            acts as a container that displays the navbar on each of those pages.*/}
          <Route element={<Layout />}>
            {/* Route protection with JWT token. use to require a token to access that particurlar route

              <Route path="/path/you/want" element={
                <ProtectedRoute>
                  <ComponentYouAreRoutingTo />
                </ProtectedRoute>
                } /> */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DisplayDashboard />
              </ProtectedRoute>
            } />

            <Route path="/locations" element={
              <ProtectedRoute>
                <DisplayLocations />
              </ProtectedRoute>
            } />

            <Route path="/categories" element={
              <ProtectedRoute>
                <DisplayCategories />
              </ProtectedRoute>
            } />

            <Route path="/additem" element={
              <ProtectedRoute>
                <DisplayAddItem />
              </ProtectedRoute>
            } />

            <Route path="/edititem/:id" element={
              <ProtectedRoute>
                <DisplayEditItem />
              </ProtectedRoute>
            } />


          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
