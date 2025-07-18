import React from 'react';
import BackButton from '../components/BackButton';

const RegistrationPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <BackButton />
      <h1>Registration Page</h1>
      <p>Implement QR code logic here</p>
      {/* Add your registration form here */}
    </div>
  );
};

export default RegistrationPage;
