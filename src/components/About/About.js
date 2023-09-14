import React, { Fragment } from 'react';
import './About.css';
import NavBar from '../NavBar/NavBar';

const About = () => {

    return (
        <Fragment>
            <NavBar />
            <div className='container aboutPage'>
                <div className="card text-bg-light mb-4 cardAbout">
                    <h2 className="card-header" style={{ color: 'grey' }}>Passionate Frontend Developer</h2>

                    <div className="card-body">
                        <h5 className="card-title">Abhishek Mishra</h5>
                        <p className="card-text" style={{ color: 'grey' }}>"My name is Abhishek Mishra, and I am a highly skilled Frontend Developer with expertise in React and Redux. I have a proven track record of building elegant and responsive web applications that engage users and meet business objectives. My proficiency in these technologies allows me to create dynamic and efficient user interfaces that enhance the overall user experience. I am actively seeking new opportunities to leverage my skills and contribute to innovative projects. I am excited about the prospect of joining a forward-thinking team where I can apply my knowledge and passion for web development to drive success. Let's connect and explore how I can be a valuable asset to your organization."</p>
                    </div>
                    <a target='_blank' className='aboutLink' href='https://64f69ac03e92e200080c3e25--monumental-kringle-d95917.netlify.app/' type="button" className="btn btn-success">See my portfolio</a>
                </div>
            </div >
        </Fragment>

    )
}

export default About