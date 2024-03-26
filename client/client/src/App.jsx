// Route protection with JWT token. use 
/*
<Route path="/path/you/want" element={
              <ProtectedRoute>
                <ComponentYouAreRoutingTo />
              </ProtectedRoute>
            } />
*/
// to require a token to access that particurlar route

//AuthProvider stores token and userId in state globally
import { AuthProvider, useAuth } from './context/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
