import '../App.css';
import React from 'react';
import BackButton from '../components/backButton';
import qrCode from '../assets/features/qr-code.png'
import bankId from '../assets/bankId.svg'


const RegistrationPage: React.FC = () => {
  return (
    <div className='registration-page'>
      <BackButton />
      {/* <img src={bankId} alt="BankID" className='bank-id-img' /> */}
      <h1>Registrera dig med BankID </h1> 
      <p>Skanna QR-koden med BankID för att registrera dig </p>
     
      {/* Add your registration form here */}
      <div className='qr-code-container'>
        <img src={qrCode} alt="BankID" className='qr-code-img'  />
      </div>
    </div>
  );
};

export default RegistrationPage;
