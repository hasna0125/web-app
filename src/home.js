import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-slideshow-image/dist/styles.css';
import {Fade, Zoom, Slide} from 'react-slideshow-image';
import Carousel from 'react-bootstrap/Carousel';
import logo from './Images/logo-removebg-preview.png';
import img1 from './Images/brain_.jpg';
import img2 from './Images/symps.jpg';
import img3 from './Images/symp-modified.png';
import img4 from './Images/final.jpg';
import img5 from './Images/logo_pen_tone-modified.png';
import img from './Images/challenges.jpg';
import cost from './Images/dollar.svg';
import detect from './Images/detect.svg';
import non from './Images/non.png';
import green from './Images/green.jpg';

// https://www.shutterstock.com/image-photo/woman-holds-her-hand-pain-260nw-1893483988.jpg


const slideImages = [
    {
        url: img4,
        caption: "How To Spot Parkinson's Disease Early ?"
    },
    {
        url: 'https://www.shutterstock.com/image-photo/woman-holds-her-hand-pain-260nw-1893483988.jpg',
        caption: "Early Symptoms of Parkinson's Disease"
    },
    {
        url: 'https://pbs.twimg.com/media/GLYhOksWsAEM8hs.jpg',
        caption: "AI Tool Detects Parkinson's Disease Years Before Symptoms Show"
    },
    {
        url: green,
        caption: "Join us in the fight against Parkinson's disease. Together, let's pave the way for early detection and intervention. Experience the power of Pen & Tone today, and take control of your health like never before!"
    }
];

const divStyle = {
    display : 'block',
    height : '90vh',
    backgroundSize : 'cover',
    backgroundPosition : 'fixed'
}

const spanStyle = {
    backgroundColor : 'rgba(213, 246, 220, 0.2)',
    borderRadius : '10px',
    fontSize : '60px',
    alignItems : 'center',
    color : '#FFFFFF',
    // fontFamily : 'fantasy',
    padding : '1%'
}

const back = {
    height : '90vh',
    backgroundColor : 'rgba(0, 0, 0, 0.4)',
    alignItems : 'center',
    justifyContent : 'center',
    textAlign : 'center',
    display : 'flex',
    
}



// const handleClick = () => {
//   // Scroll to the target div
//   targetRef.current.scrollIntoView({ behavior: 'smooth' });
// };
 
function Home() {
    const navigate = useNavigate();
    const targetRef_1 = React.useRef(null);
    const targetRef_2 = React.useRef(null);
    const targetRef_3 = React.useRef(null);
    const targetRef_4 = React.useRef(null);
    const targetRef_5 = React.useRef(null);

    return (
        <div className="home">
            {/* <button type="button" className="btn" onClick={() => navigate("/main")}>Go to sign in / sign up</button> */}
            <header id="header_one">
                <div className="logo">
                    <img src={logo}/>
                    <div id="title">
                        <h1 id="title_one">Pen & Tone</h1>
                        <h3 id="title_two">Parkinson</h3>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li><a href="/" id="a_one">Home</a></li>
                        <li><a href="#targetDiv_4" id="a_one">About Us</a></li>
                        <li><a href="#targetDiv_1" id="a_one">Parkinson</a></li>
                        <li><a href="#targetDiv_2" id="a_one">Symptoms</a></li>
                        <li><a href="#targetDiv_3" id="a_one">Platform</a></li>
                        <li><a href="/main" id="a_one">Login</a></li>
                    </ul>
                </nav>
      </header>
    <div className="body">
        <Slide>
            {slideImages.map((image, index) => (
                <div key={index}>
                    <div style={{...divStyle, backgroundImage: `url(${image.url})`}}>
                        <div style={back}><h1 style={spanStyle}>{image.caption}</h1></div>
                    </div>
                </div>
            ))}
        </Slide>
    </div>
    <div className="container" id="targetDiv_1" ref={targetRef_1}>
      <div class="text">
        <h1>Discover the Truth About Parkinson's Disease: Unraveling the Mystery Behind Its Impact on Our Life!</h1>
        <p>Parkinson's disease is more than just tremors – it's a complex neurological condition that affects millions worldwide. <br/>
            <b>But what exactly is Parkinson's?</b> It's a condition that gradually disrupts your brain's ability to control movement, leading to symptoms like tremors, stiffness, and difficulty with balance and coordination.</p>
            <p>Imagine a life where every movement feels like a challenge, where even the simplest tasks become daunting. 
                That's the reality for those living with Parkinson's. But there's hope! By understanding the science behind Parkinson's and discovering it earlier, 
                you can take proactive steps to manage symptoms,
                 improve quality of life, and even slow its progression.</p>
      </div>
      <div class="image">
        <img src={img} />
      </div>
    </div>


    <div className="container" id="targetDiv_2" ref={targetRef_2}>
      <div class="image">
        <img src={img3} />
      </div>
      <div class="text">
        <h1>Recognizing the Early Signs of Parkinson's Disease for a Better Tomorrow!</h1>
        <p><b>Are you noticing subtle changes in your body that just don't seem right?</b> It might be more than just fatigue or stress – it could be the early signs of Parkinson's disease, a condition that affects millions worldwide.</p>
        <p>Parkinson's disease can manifest differently in individuals, but some early symptoms commonly include: </p>
        <ul>
            <li>Tremor in hands, arms, legs, jaw, or head</li>
            <li>Muscle stiffness, where muscle remains contracted for a long time</li>
            <li>Slowness of movement</li>
            <li>Impaired balance and coordination, sometimes leading to falls</li>
            <li>Depression and other emotional changes</li>
            <li>Difficulty swallowing, chewing</li>
            <li><b>Changes in Handwriting:</b> Handwriting may become smaller and more cramped, known as micrographia</li>
            <li><b>Speech Changes:</b> Speaking may become softer or slurred, and there may be hesitations or pauses.</li>
        </ul>

      </div>
    </div>


    <div className="container" id="targetDiv_3" ref={targetRef_3}>
      <div class="text">
        <h1>Pen & Tone: Revolutionizing Parkinson's Detection with AI-Powered Handwriting and Speech Analysis!</h1>
        <p><b>Pen & Tone</b> is your cutting-edge platform for early Parkinson's disease detection, harnessing the power of artificial intelligence to analyze handwriting and speech patterns like never before. Our innovative technology allows for quick, non-invasive screening, providing potentially life-changing insights into your health.</p>
        <p>Imagine a platform that can detect subtle changes in your handwriting or speech, indicators that could signal the onset of Parkinson's disease. With <b>Pen & Tone</b>, that vision is now a reality. Our advanced algorithms meticulously analyze your writing and speech patterns, identifying potential markers of Parkinson's with precision and accuracy.</p>
      </div>
      <div class="image">
        <img src={img5} />
      </div>
    </div>


<div className="about" id="targetDiv_4" ref={targetRef_4}>
 <div className="features">
    <div class="row1-container">
    <div class="box box-down cyan">
      <h2>Cost-Effectiveness</h2>
      <p>Save significant amounts of money as a result of reduced diagnosis and treatment costs</p>
      <img id="icon" src={cost} alt="" />
    </div>

    <div class="box red">
      <h2>Early Detection</h2>
      <p>Offer the advantage of identifying symptoms in the early stages, allowing for prompt intervention and better disease management</p>
      <img id="icon" src={detect} alt="" />
    </div>

    <div class="box box-down blue">
      <h2>Privacy and Security</h2>
      <p>Assure high privacy and security to protect customers' sensitive health and personal data</p>
      <img id="icon" src="https://cdn1.iconfinder.com/data/icons/round-color-icon/3/43-512.png" alt="" />
    </div>
  </div>
  <div class="row2-container">
    <div class="box orange">
      <h2>Non-Invasive</h2>
      <p>Our platform offers a non-invasive way to detect Parkinson's disease</p>
      <img id="icon" src={non} alt="" />
    </div>
  </div>
    </div>
    <div className="footer" id="targetDiv_5" ref={targetRef_5}>
        <footer className="footer-distributed">
        
              <div className="footer-left">
        
                <h3>Medi<span>Tech</span></h3>
        
                <p className="footer-links">
                  <a href="/" class="link-1">Home</a>
                
                  <a href="#targetDiv_4">About</a>
                  
                  <a href="#targetDiv_5">Contact</a>
                </p>
        
                <p className="footer-company-name">Company Name © 2022</p>
              </div>
        
              <div className="footer-center">
        
                <div>
                  <i className="fa fa-map-marker"></i>
                  <p><span>MACTA, Centre Ville, Sidi Bel Abbes</span> SBA, Algérie</p>
                </div>
        
                <div>
                  <i className="fa fa-phone"></i>
                  <p>(+213) xx xx xx xx xx</p>
                </div>
        
                <div>
                  <i className="fa fa-envelope"></i>
                  <p><a href="mailto:support@company.com">support@company.com</a></p>
                </div>
        
              </div>
        
              <div className="footer-right">
        
                <p className="footer-company-about">
                  <span>About the company</span>
                  <b>MediTech</b> is a pioneering company at the forefront of merging the fields of medicine, computer science, and artificial intelligence. 
                  We specialize in developing cutting-edge medical systems that harness the power of AI tools and techniques to revolutionize healthcare. 
                  From diagnostic algorithms to personalized treatment recommendations, our innovative solutions are designed to improve patient outcomes, streamline healthcare processes, and empower medical professionals with advanced technological capabilities. 
                  At <b>MediTech</b>, we are committed to driving the future of healthcare through innovation, precision, and compassion.
                </p>
        
                <div className="footer-icons">
        
                  <a href="#"><i className="fa-brands fa-facebook"></i></a>
                  <a href="#"><i className="fa-brands fa-linkedin"></i></a>
        
                </div>
        
              </div>
        
            </footer>
        </div>
    </div>
</div>

    );
    
}
 
export default Home;