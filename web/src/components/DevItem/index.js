import React from 'react';

import './style.css';

function DevItem({ dev }) {
  return(
    <li key={dev._id} className="dev-item">
      <header>
        <img src={dev.avatar_url} alt="Bruno Silva" />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
    </li>
  );
}

export default DevItem;