import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../assets/hero.png';
import Header from '../../component/Header';

function LandingPage() {
  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6">
            <h1>Welcome to TodoList App</h1>
            <p>Start managing your tasks and stay organized!</p>
            <p>Ini Branch Development!</p>
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
          </div>
          <div className="col-lg-6">
            <img src={Hero} alt="Hero" className="img-fluid" />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;