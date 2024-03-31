//utility imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Layout from './components/Layout'

// display (pages) imports
import DisplayLogin from './views/DisplayLogin'
import DisplayRegister from './views/DisplayRegister'

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

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
