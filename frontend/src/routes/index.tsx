import React, { createContext, useState, SetStateAction } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Homepage/Home";
import Registration from "../components/AuthenthicationPage/Registration";
import Login from "../components/AuthenthicationPage/Login";
import Main from "../components/Mainpage/Main";
import NewReview from "../components/CreatePage/NewReview";
import Review from "../components/ReviewPage/Review";
  
export default (

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/session" element={<Main />} />
          <Route path="/review" element={<NewReview />}/>
          <Route path="/review/:id" element={<Review />}/>
        </Routes>
      </Router>
    );
  