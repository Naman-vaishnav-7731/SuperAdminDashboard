import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import "../../css/profile.css";

const UserProfileCard = ({ name, username, bio, imageSrc }) => {
  return (
    <Card className="user-profile-card">
      <div className="user-profile-header">
        <Image className="user-profile-image" src={imageSrc || <FaUserCircle />} roundedCircle />
        <div className="user-profile-header-text">
          <h3>{name}</h3>
          <p>@{username}</p>
        </div>
      </div>
      <Card.Body>
        <Card.Text>{bio}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserProfileCard;
