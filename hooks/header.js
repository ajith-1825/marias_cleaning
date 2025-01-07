import Image from "next/image";
import Link from "next/link";
import img1 from '../public/img (1).png';
import img2 from '../public/img (2).png';

import {useState} from "react";

export default function Header(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return(
        <header>
            <div className="logo" style={{ height: '20vh', position: 'relative' }}>
                <Image 
                    src={img1} 
                    alt="Marias Logo" 
                    priority 
                    layout="fill"
                    objectFit="contain">
                </Image>
            </div>
            <button className="menu-toggle" onClick={toggleMenu}>
                &#9776; {/* Unicode for hamburger icon */}
            </button>
            <span>
            <div className="heading">
                {/* <h3><a>Change Location</a></h3> */}
                <div className="logo_small">
                <Image 
                    src={img2} 
                    alt="Marias Logo" 
                    priority
                    objectFit="contain">
                </Image>
            </div>
                <h2><p>MARIAS CLEANING SERVICES</p></h2>
                <h3><p>Locally Owned and Operated</p></h3>
            </div>
            </span>
            <div className={`location ${isOpen ? "open" : ""}`}>
                <button className="menu-toggle" onClick={toggleMenu}>
                    &#9776; {/* Unicode for hamburger icon */}
                </button>
                {/* <h3><a>Change Location</a></h3> */}
                <h2><p>MARIAS CLEANING SERVICES</p></h2>
                <h3><p>Locally Owned and Operated</p></h3>
                <nav>
                    <Link href='/home'>Home</Link>
                    <Link href='/'>Book Online</Link>
                    <Link href='profile'>View your subscriptions</Link>
                    {/* <a href="">Why Hire Us</a>
                    <a href="">About Us</a>
                    <a href="">Cleaning Tips</a> */}
                </nav>
            </div>
            <div className="contact">
                {/* <div className="cont">
                    <p>Apply Locally/Aplicar Localmente</p>
                    <p>Special Offers</p>
                    <p>Gift Certificates</p>
                </div> */}
                <a href="tel:+14088728089">(408) 872-8089</a>
                <Link href='/estimate' className="estimate-btn">Request a Free Estimate</Link>
            </div>
        </header>
    )
}