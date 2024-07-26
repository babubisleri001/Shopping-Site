import './Gallery.scss';
import img1 from '../../assets/Designs/design1.png'
import img2 from '../../assets/Designs/design2.png'
import img3 from '../../assets/Designs/design3.png'
import img4 from '../../assets/Designs/design4.png'

import { useRef } from 'react';

const GalleryCard = ({ src }) => {
    return (
        <div className="gallery-card-wrapper">
            <img src={src} alt="Gallery" />
        </div>
    );
};

const Gallery = () => {
    const galleryRef = useRef(null);
    const galleryWrapRef = useRef(null);
    const images = [img1, img2, img3, img4];


    return (
        <div ref={galleryWrapRef} className="gallery-wrapper">
            <div className="gallery-title">
                Gallery
            </div>
            <div ref={galleryRef} className="gallery">
                {images.map((image, i) => {
                    return <GalleryCard key={i} src={image}/>
                })}
            </div>
        </div>
    );
};

export default Gallery;
