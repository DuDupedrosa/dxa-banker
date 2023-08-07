import React from 'react';
import './style.css';

export default function ButtonLoadingSpinnerComponent() {
  return (
    <div className="lds-ring mb-2">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
