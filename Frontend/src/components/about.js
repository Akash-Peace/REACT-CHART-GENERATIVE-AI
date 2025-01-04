import './about.css';
import { cacheId } from '../configs/initial-configs';
import { useState } from 'react';

const About = () => {
    
    const [cacheText, setCacheText] = useState('Clear cache');
    
    return (
        <div className="about-container">
            <p className="about-me" onClick={() => window.open('https://www.linkedin.com/in/akash-2000-cse/', '_blank')}>Innovated by Akash A</p>
            <div style={{ display: 'flex' }}>
                <p className="about-reload" onClick={() => window.location.reload()}>Try a different image</p>
                <p>&nbsp;&nbsp;|&nbsp;&nbsp;</p>
                <p className="about-reload" onClick={() => { localStorage.removeItem(cacheId); setCacheText("Cache cleared!") }}>{cacheText}</p>
            </div>
        </div>
    );
}

export default About;
