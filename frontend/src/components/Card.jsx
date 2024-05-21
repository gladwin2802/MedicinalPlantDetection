import React from 'react';
import '../assets/css/componentCss/Card.css';

const Card = ({ imageUrl, prediction }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt="Uploaded" className="card-image" />
      <div className="card-content">
        <span>{prediction}</span>
      </div>
    </div>
  );
};

export default Card;
