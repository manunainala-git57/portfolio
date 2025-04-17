import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components'; 
import '../App.css';

function Header({ title }) {
  const theme = useContext(ThemeContext);

  return (
    <div className="header">
      <h1 style={{ color: theme?.textColor || '#333' }}>{title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
