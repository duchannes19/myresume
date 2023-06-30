import React, { useState } from 'react'
import Navbar from './navbar';
import ParticlesContainer from './particles';

function Homepage() {

    const [language, setLan] = useState(0);

    return(
        <div>
            <ParticlesContainer/>
            <Navbar lan={language} setLan={setLan}/>
        </div>
    );
};

export default Homepage;