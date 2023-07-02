import React from 'react'
import pc from '../images/about.gif'

const About = () => {
    return (<div className='info'>
        <h4>About Me</h4>
        <>
        <p>Hi I am Andrea, full stack developer.</p>
        <p style={{margin: '1rem'}}>I am a Computer Engineering graduate and have a passion for creating and experimenting with programming languages.</p>
        <p>I want to put my knowledge and skills to contribute to the development of quality software.</p>
        <p>I am motivated to continuously learn and take on complex challenges.</p>
        <img src={pc} alt='about' className='about-gif'/>
        </>
    </div>);
};

export default About;