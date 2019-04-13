import React from 'react';
import './Header.scss';
import bizLuminateLogo from '../assets/images/bizLuminateLogo.jpg';

const Header = () => {
  return (
    <div className = "header">
      <div className = "logoDiv">
        <img src = {bizLuminateLogo} alt = "biz luminate logo" />
      </div>
    </div>
  );
};

export default Header;