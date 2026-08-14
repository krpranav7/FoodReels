import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import UserLogin from '../pages/auth/userLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from '../pages/general/Home';
import BottomNav from '../components/BottomNav';
import ProtectedRoute from '../components/ProtectedRoute'
import Saved from '../pages/general/Saved';
import Profile from '../pages/food-partner/Profile';
import CreateFood from '../pages/food-partner/CreateFood';
import ProtectedFoodPartnerRoute from '../components/ProtectedFoodPartnerRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user/register" replace />}
                />
        <Route path='/user/register' element={< UserRegister />} />
        <Route path='/user/login' element={< UserLogin />} />
        <Route path='/food-partner/register' element={< FoodPartnerRegister />} />
        <Route path='/food-partner/login' element={< FoodPartnerLogin />} />
        <Route path='/home' 
          element={<ProtectedRoute>
                      <Home />
                      <BottomNav />
                    </ProtectedRoute>} />

        <Route path="/saved"
          element={<ProtectedRoute>
                        <Saved />
                        <BottomNav />
                  </ProtectedRoute>} />
        
        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path="/create-food" 
        element={<ProtectedFoodPartnerRoute>
              <CreateFood />
            </ProtectedFoodPartnerRoute>} />
      </Routes>
    </Router>
  )
}

export default AppRoutes