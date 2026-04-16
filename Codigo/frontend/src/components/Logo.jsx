import React from 'react'

export default function Logo() {
  return (
    <div className="logo-container">
      <div className="logo-icon-supreme">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="logo-svg"
        >
          <path 
            d="M3 10L12 2L21 10V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V10Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M12 18.5C12 18.5 9 16.5 9 14.5C9 13.1193 10.1193 12 11.5 12C11.85 12 12.18 12.08 12.48 12.23C12.78 12.08 13.11 12 13.46 12C14.8407 12 15.96 13.1193 15.96 14.5C15.96 16.5 12.96 18.5 12.96 18.5" 
            fill="currentColor" 
          />
          <circle cx="8.5" cy="11.5" r="1.2" fill="currentColor" />
          <circle cx="11" cy="9.5" r="1.2" fill="currentColor" />
          <circle cx="14.5" cy="9.5" r="1.2" fill="currentColor" />
          <circle cx="17" cy="11.5" r="1.2" fill="currentColor" />
        </svg>
      </div>
      <h1 className="logo-text">
        <span className="lar">Lar</span>
        <span className="certo">Certo</span>
      </h1>
    </div>
  )
}
