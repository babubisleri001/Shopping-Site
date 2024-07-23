import './Test.scss'
import img1 from '../../assets/Designs/design1.png'
import {motion} from 'framer-motion'

const GalleryCard = ({src}) => {
    return <div className="gallery-card-wrapper">
        <img src={src} />
    </div>
}


const Test = () => {
    return (
        <div className="gallery-wrapper">
            <div className="gallery-title">
                Gallery
            </div>
            <div className="gallery">
                <motion.GalleryCard initial={{x:0}} animate={{x:"100%"}} src={img1}/>
                <GalleryCard src={img1}/>
                <GalleryCard src={img1}/>
                <GalleryCard src={img1}/>
                <GalleryCard src={img1}/>
            </div>
        </div>
    )    
}


export default Test;