import React from 'react'

export const Copyright = () =>{

    return (
        <div className='footer'>
          <footer>
            <p>&copy; {new Date().getFullYear()} Andrea Massignan</p>
          </footer>
        </div>
      );
}