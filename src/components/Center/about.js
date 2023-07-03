import React from 'react'
import pc from '../images/about.gif'

const About = () => {
    return (<div className='info'>
        <h3 className='center-title'>About Me</h3>
        <>
        <p>Hi I am <b>Andrea</b>, full stack developer.</p>
        <p style={{margin: '1rem'}}>I am a <b>Computer Engineering</b> graduate and have a passion for creating and experimenting with programming languages.</p>
        <p>I want to put my knowledge and <b>skills</b> to contribute to the development of quality software.</p>
        <p>I am <b>motivated</b> to continuously learn and take on complex challenges.</p>
        <img src={pc} alt='about' className='about-gif'/>
        </>
    </div>);
};

export default About;