import './Test.scss';


import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const GalleryCard = ({ src }) => {
    return (
        <div className="gallery-card-wrapper">
            <img src={src} alt="Gallery" />
        </div>
    );
};

const Test = () => {
    const galleryRef = useRef(null);
    const galleryWrapRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);


    return (
        <div ref={galleryWrapRef} className="gallery-wrapper">
            <div className="gallery-title">
                Gallery
            </div>
            <div ref={galleryRef} className="gallery">
                <GalleryCard src='/src/assets/Designs/design1.png' />
            </div>
        </div>
    );
};

export default Test;
