import React from 'react'

export default function Logo() {
  return (
    <div className="logo-container">
      <div className="logo-icon-supreme">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="paw-svg"
        >
          <path 
            d="M12 14C14.2091 14 16 15.7909 16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18C8 15.7909 9.79086 14 12 14Z" 
            fill="currentColor" 
          />
          <path 
            d="M7 10C8.10457 10 9 10.8954 9 12C9 13.1046 8.10457 14 7 14C5.89543 14 5 13.1046 5 12C5 10.8954 5.89543 10 7 10Z" 
            fill="currentColor" 
          />
          <path 
            d="M17 10C18.1046 10 19 10.8954 19 12C19 13.1046 18.1046 14 17 14C15.8954 14 15 13.1046 15 12C15 10.8954 15.8954 10 17 10Z" 
            fill="currentColor" 
          />
          <path 
            d="M10 4C11.1046 4 12 4.89543 12 6C12 7.10457 11.1046 8 10 8C8.89543 8 8 7.10457 8 6C8 4.89543 8.89543 4 10 4Z" 
            fill="currentColor" 
          />
          <path 
            d="M14 4C15.1046 4 16 4.89543 16 6C16 7.10457 15.1046 8 14 8C12.8954 8 12 7.10457 12 6C12 4.89543 12.8954 4 14 4Z" 
            fill="currentColor" 
          />
        </svg>
      </div>
      <h1 className="logo-text">
        <span className="lar">Lar</span>
        <span className="certo">Certo</span>
      </h1>
    </div>
  )
}
