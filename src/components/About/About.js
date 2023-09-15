import React, { Fragment} from 'react';
import './About.css';
import NavBar from '../NavBar/NavBar';

const About = () => {

    return (
        <Fragment>
            <NavBar />
            <div className='container'>
                <div className='container aboutPage'>
                    <div className="card text-bg-light mb-4 cardAbout">
                        <h2 className="card-header" style={{ color: 'grey' }}>Passionate Frontend Developer</h2>
                        <div className="card-body">
                            <h5 className="card-title">Abhishek Mishra</h5>
                            <p className="card-text" style={{ color: 'grey' }}>"My name is Abhishek Mishra, and I am a highly skilled Frontend Developer with expertise in React and Redux. I have a proven track record of building elegant and responsive web applications that engage users and meet business objectives. My proficiency in these technologies allows me to create dynamic and efficient user interfaces that enhance the overall user experience. I am actively seeking new opportunities to leverage my skills and contribute to innovative projects. I am excited about the prospect of joining a forward-thinking team where I can apply my knowledge and passion for web development to drive success. Let's connect and explore how I can be a valuable asset to your organization."</p>
                        </div>
                        <a target='_blank' className='btn btn-success aboutLink' href='https://64f69ac03e92e200080c3e25--monumental-kringle-d95917.netlify.app/' type="button">See my portfolio</a>
                    </div>
                </div >
                <div className='container aboutsection gap-4'>
                    <div className="card text-bg-success " style={{ maxWidth: "24rem" }}>
                        <div className="card-header" style={{ fontWeight: 'bold' }}><button type="button" className="btn btn-outline-light">Expense and others features</button>
                        </div>
                        <div className="card-body">
                            <h6 className="card-title">- Daily Expense Add   </h6>
                            <h6 className="card-title">- Expense more than 10000 unlock premium </h6>
                            <h6 className="card-title">- Download Expenses for premium member </h6>
                            <h6 className="card-title">- Delete Expense</h6>
                            <h6 className="card-title">- Edit Expense </h6>
                            <h6 className="card-title">- See your profile</h6>
                        </div>
                    </div>
                    <div className="card text-bg-success " style={{ maxWidth: "24rem" }}>
                        <div className="card-header" style={{ fontWeight: 'bold' }}><button type="button" className="btn btn-outline-light">Authentication and others features  </button>
                        </div>
                        <div className="card-body">
                            <h6 className="card-title">- Login   </h6>
                            <h6 className="card-title">- Sign Up   </h6>
                            <h6 className="card-title">- Logout  </h6>
                            <h6 className="card-title">- Password change</h6>
                            <h6 className="card-title">- Email verification </h6>
                            <h6 className="card-title">- Profile update </h6>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default About