import React from "react";
import { useNavigate } from 'react-router-dom';
import HighlightIcon from '@mui/icons-material/Highlight';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <header>
      <h1><HighlightIcon />Noteslagic</h1>
      { localStorage.getItem('token') ? <div onClick={handleClick} className="logout" style={{color: 'white'}}><LogoutIcon /></div> : null}
    </header>
  );
}

export default Header;
