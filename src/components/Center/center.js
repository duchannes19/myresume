import React from 'react'
import About from './about';
function Center({value}){

    return(
        <div className='center'>
            <div className='center-container'> 
                {value === 0 && <About />}
            </div>
        </div>
    );

};

export default Center;