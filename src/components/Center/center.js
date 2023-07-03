import React from 'react'
import About from './about';
import Resume from './resume';
import Portfolio from './portfolio';
function Center({value}){

    return(
        <div className='center'>
            <div className='center-container'> 
                {value === 0 && <About />}
                {value === 1 && <Resume />}
                {value === 2 && <Portfolio />}
            </div>
        </div>
    );

};

export default Center;