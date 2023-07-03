import React from 'react'
import About from './about';
import Resume from './resume';
function Center({value}){

    return(
        <div className='center'>
            <div className='center-container'> 
                {value === 0 && <About />}
                {value === 1 && <Resume />}
            </div>
        </div>
    );

};

export default Center;