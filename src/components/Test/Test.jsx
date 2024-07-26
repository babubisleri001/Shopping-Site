import './Test.scss';
import img1 from '../../assets/Designs/design1.png'
import img2 from '../../assets/Designs/design2.png'
import img3 from '../../assets/Designs/design3.png'
import img4 from '../../assets/Designs/design4.png'


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
                <GalleryCard src={img1} />
                <GalleryCard src={img2} />
                <GalleryCard src={img3} />
                <GalleryCard src={img4} />
            </div>
        </div>
    );
};

export default Test;
