import React, { useState } from 'react'
import Navbar from './navbar';
import ParticlesContainer from './particles';
import Center from './Center/center';

function Homepage() {

    const [language, setLan] = useState(0);
    const [center, setCenter] = useState(0);

    return(
        <div>
            <ParticlesContainer/>
            <Navbar lan={language} setLan={setLan} setCenter={setCenter}/>
            <Center value={center}/>
        </div>
    );
};

export default Homepage;