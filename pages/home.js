import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../hooks/header"
import myImage from '../public/img (1).png';
import diningTable from '../public/dining_table.jpg'
import residentialServices from '../public/resd.svg'
import gift from '../public/gift.svg'
import spray from '../public/spray.svg'
import moveIn from '../public/icon4.svg'
import customerPhone from '../public/customer-phone.webp'
import pic1 from '../public/mly-circle-image.webp'
import coffeeMaker from '../public/how-to-clean-french-press-coffee-maker370x194.webp'
import pic2 from '../public/mly-natural-cleaning-products-bacteria.webp'
import pic3 from '../public/molly-maid-organize-silverware-370x210.webp'

export default function main(){
    const [isOpen, setIsOpen] = useState({});

    const toggleDropdown = (id) => {
        console.log("Toggling dropdown for id:", id);
        setIsOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };

    return(
        <div>
            <Header/>
            <main>
                <section className="hero">
                    <div className="hero-text">
                        <h1>Best House Cleaning Service Near San Jose, CA</h1>
                        <p>Summer is for making memories. Not cleaning. Marias will provide you with a freshly cleaned home while you take advantage of the long summer days.</p>
                        {/* <a href="#" className="estimate-btn">Request a Free Estimate</a> */}
                    </div>
                </section>
                <section className="promise">
                    <div>
                        <h2>Experience Our Neighborly Done Right Promise™</h2>
                        <p>We offer Marias’s Neighborly Done Right Promise™ on all our services. This means you can trust us to meet your expectations. If you’re not satisfied with our services, call us by the end of the next business day and we’ll come back and clean it again at no additional cost to you.</p>
                        <a href="#" className="about-us-btn">About Us</a>
                    </div>
                    {/* <Image 
                        // src={diningTable} 
                        alt="Dining Table" 
                        priority 
                        layout="fill"
                        objectFit="contain">
                    </Image> */}
                </section>
                <section className="services">
                    <h2>How Marias Cleaning Services Can Help You</h2>
                    <div className="service-cards">
                        <div className="service-card">
                            {/* <Image 
                                // src={residentialServices} 
                                alt="Residential Services" 
                                priority 
                                layout="fill"
                                objectFit="contain">
                            </Image> */}
                            <h3>Residential Services</h3>
                            <p>Choose a plan to fit to your needs-no contracts, no hassle</p>
                        </div>
                        <div className="service-card">
                            {/* <Image 
                                // src={gift} 
                                alt="Perfect Gift" 
                                priority 
                                layout="fill"
                                objectFit="contain">
                            </Image> */}
                            <h3>Perfect Gift</h3>
                            <p>Give the gift of time with Maria Made gift certificate</p>
                        </div>
                        <div className="service-card">
                            {/* <Image 
                                // src={spray} 
                                alt="Recurring Cleaning" 
                                priority 
                                layout="fill"
                                objectFit="contain">
                            </Image> */}
                            <h3>Practically Spotless Blog</h3>
                            <p>Get the expert advice from our team of cleaning specialists</p>
                        </div>
                        <div className="service-card">
                            {/* <Image 
                                // src={moveIn} 
                                alt="Move-In Cleaning" 
                                priority 
                                layout="fill"
                                objectFit="contain">
                            </Image> */}
                            <h3>Ms Maria Foundation</h3>
                            <p>Supporting the victims of domestic violence</p>
                        </div>
                    </div>
                </section>
                <section className="description">
                    <h1>Home Cleaning Services We Provide</h1>
                    <h2>Our Approach: Custom Home Cleaning</h2>
                    <p>
                        Looking for the best home cleaning services near you? Look no further than Marias's custom home cleaning services. We understand the challenges of maintaining a clean home amid a busy schedule. 
                        Our team is dedicated to providing top-notch home cleaning services tailored to your specific needs and preferences.
                        <br/><br/>
                        At Marias, we offer unmatched flexibility in our cleaning services. Our team collaborates closely with you to develop a tailored cleaning plan that suits your lifestyle and budget. 
                        Whether you require regular cleaning, assistance with move-in cleaning, or a one-time specific cleaning, we've got you covered.
                        <br/><br/>
                        Don't settle for a one-size-fits-all approach to home cleaning. Trust Marias for the best home cleaning services that exceed your expectations. 
                        Contact us today to schedule a consultation and experience the convenience and flexibility of our custom cleaning services.
                        <br/><br/>
                        Some of our custom home cleaning services include:
                        <br/><br/>
                    </p>
                    <div className="container">
                        <ul className="list">
                            <li className="list-item"><span> Recurring Cleaning Services</span></li>
                            <li className="list-item"><span> One Time Cleaning</span></li>
                            <li className="list-item"><span> Occasional Cleaning</span></li>
                            <li className="list-item"><span> Home Cleaning</span></li>
                            <li className="list-item"><span> Apartment and Condo Cleaning</span></li>
                            <li className="list-item"><span> In Cleaning</span></li>
                            <li className="list-item"><span> Move Out Cleaning</span></li>
                            <li className="list-item"><span> Special Event Cleaning.</span></li>
                        </ul>
                    </div>
                </section>
                <section className="promise">
                    <div>
                        <h2>Find Home Cleaning Services Near You</h2>
                        <p>Here at Marias, we pride ourselves on offering expert home cleaning services to our customers in 40 states as well as Puerto Rico! To learn more about our home clearing services near you, call us today or visit our locations page!</p>
                    </div>
                    {/* <Image 
                        // src={customerPhone} 
                        alt="Customer Phone" 
                        priority 
                        layout="fill"
                        objectFit="contain">
                    </Image> */}
                </section>
                <section className="promise">
                    {/* <Image 
                        // src={pic1} 
                        alt="pic" 
                        priority 
                        layout="fill"
                        objectFit="contain">
                    </Image> */}
                    <div>
                        <h2>Why Choose Marias’s Home Cleaning Service</h2>
                        <ul>
                            <li>Cleaning and sanitizing services.</li>
                            <li>Professional Staff.</li>
                            <li>Customized cleaning plans.</li>
                            <li>No contracts.</li>
                            <li>The Neighborly Done Right Promise™.</li>
                        </ul>
                        <a href="#" className="estimate-btn">Request a Free Estimate</a>
                    </div>
                </section>
                <br/>
                <section className="promise">
                    {/* <Image 
                        // src={myImage} 
                        alt="Logo" 
                        priority 
                        layout="fill"
                        objectFit="contain">
                    </Image> */}
                    <div>
                        <h2>House Cleaning Gift Certificates</h2>
                        <p>Click below to purchase a house cleaning gift certificate(s)!</p>
                        <a href="#" className="estimate-btn">Purchase Now</a>
                    </div>
                    <i className="fa-solid fa-gift"></i>
                </section>
                <section className="location-service">
                    <div>
                        <h2>Marias Cleaning Services</h2>
                    <h3>Proudly Serving:</h3>
                    <p>Atherton, Belmont, Campbell, Cupertino, Foster City, Los Altos, Los Altos Hills, Los Gatos, Menlo Park, Milpitas, Monta Vista, Monte Sereno, Mountain View, New Almaden, Palo Alto, Permanente, Redwood City, San Carlos, San Jose, Santa Clara, Saratoga, Stanford, Sunnyvale, Fremont, Union City, Newark,</p>
                    </div>
                    <div className="map-container">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086509035927!2d-122.07615778468247!3d37.40276897982832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba80ed7fcb59%3A0x4a2a3620f35a313a!2sMolly%20Maid%20of%20Silicon%20Valley!5e0!3m2!1sen!2sus!4v1628825793742!5m2!1sen!2sus" width="600" height="450" allowFullScreen="" loading="lazy"></iframe>
                    </div>
                </section>
                {/* <section class="services-list">
                    <h2>Services we provide</h2>
                    <h3>Our Approach: Custom Cleaning</h3>
                    <p>
                        Are you tired of struggling to keep up with cleaning your home amidst a busy schedule?
                        Look no further than Marias's custom cleaning services. 
                        Our team understands that maintaining a well-cleaned home can be a challenge, especially when you have a packed calendar. 
                        That's why we offer custom cleaning services designed to meet your unique needs and preferences.
                    </p>
                </section> */}
                {/* <section className="client">
                    <h1 className="head">Hear From Our Clients</h1>
                    <div className="clients">
                        <div className="comments">
                            <em>"Ana and Sonia did a fantastic job, and our house is cleaner than it's been in a couple years. We'd love to have them back on a regular basis."</em>
                            <h3 className="user">Diana Cooper</h3>
                        </div>
                        <div className="comments">
                            <em>"Betty and Mariana did a fabulous job on our first cleaning this week. Both were friendly, conscientious and paid attention to detail. I look forward to having them back!"</em>
                            <h3 className="user">Sue Baker</h3>
                        </div>
                        <div className="comments">
                            <em>"I have used this service for over 15 years and am very happy with their cleaning of my home."</em>
                            <h3 className="user">Yvonne Fimby</h3>
                        </div>
                    </div>
                    <button>Read More Reviews</button>
                </section> */}
                <section className="products">
                    <h2>Practically Spotless Blog</h2>
                    <div className="product-cards">
                        <div className="product-card">
                            {/* <Image 
                                // src={coffeeMaker} 
                                alt="Pic" 
                                priority 
                                layout="fill"
                                objectFit="contain">
                            </Image> */}
                            <h3>How to Clean a French Press Coffee Maker</h3>
                            <p>There’s no doubt about it—Americans love their coffee! But why settle for an ordinary cup of Joe from a drip coffeemaker</p>
                        </div>
                        <div className="product-card">
                            {/* <Image 
                                // src={pic2} 
                                alt="Pic" 
                                priority 
                                layout="fill"
                                objectFit="contain">
                            </Image> */}
                            <h3>Do Natural Cleaning Products Kill Bacteria?</h3>
                            <p>If you are looking for a way to clean your home without the use of harsh chemicals, there are countless natural products out there</p>
                        </div>
                        <div className="product-card">
                            {/* <Image 
                                // src={pic3} 
                                alt="Pic" 
                                priority 
                                layout="fill"
                                objectFit="contain">
                            </Image> */}
                            <h3>Expertly Organize Your Silverware Drawer (Finally)</h3>
                            <p>You’re in a rush in the kitchen and give the silverware drawer a push with your hip. Cluck! It slides back open because it</p>
                        </div>
                    </div>
                    <button>Visit our Blog</button>
                </section>
                <div className="dropdown-container">
                    <h1>Reliable Answers to Our Most Common Questions</h1>
                    <p>Marias is committed to your complete satisfaction, which is why we strive to offer the most consistent, reliable, and affordable housecleaning services around. Our team of experienced professionals has taken the time to answer some of our most frequently asked questions for your convenience.</p>
                    <div className="dropdown">
                        <button onClick={() => toggleDropdown('content1')}>&#9662; Why Choose Marias?</button>
                        {isOpen['content1'] &&(
                            <div id="content1" className="dropdown-content">
                                <p>
                                    Life is busy, which means you can’t always complete everything on your to-do list. 
                                    Marias allows you to have a sparkling home, saves you valuable time, and provides the peace of mind that comes with knowing the job was done right. Our residential home cleaning service is dedicated to making your life easier. We've built a reputation for top-notch cleaning that you can trust. 
                                    Our detailed approach covers every room and corner, leaving no mess behind.
                                    You deserve a clean, comfortable space; we're here to deliver it.
                                    As part of the Neighborly family of home service brands, we uphold high standards and prioritize your satisfaction. 
                                    Choose Marias for a cleaner, healthier home that allows you to focus on what matters most to you. 
                                    Request a free estimate now!
                                </p>
                            </div>
                        )}
                    </div>
                    <div class="dropdown">
                        <button onClick={() => toggleDropdown('content2')}>&#9662; What Do We Clean?</button>
                        {!isOpen['content2'] ?(
                            <></>
                        ): (
                        <>
                            <div id="content2" className="dropdown-content">
                                <p>
                                    Marias takes care of your whole home! Our services are the definition of comprehensive. We give your kitchen a thorough cleaning, and bathrooms sparkle after we're done. 
                                    Your living room remains cozy and inviting as we tidy up.
                                    All bedrooms get our attention, with beds made and dust gone. Our professional home cleaners ensure every room you want cleaned is a delight for you to come back to. 
                                    If you’ve been looking for the best local home cleaning services near you, Marias is the right choice.
                                </p>
                            </div>
                        </>
                        )}
                    </div>
                    <div className="dropdown">
                        <button onClick={() => toggleDropdown('content3')}>&#9662; What Is Our Home Cleaning Process?</button>
                        {isOpen['content3'] && (
                            <div id="content3" className="dropdown-content">
                                <p>
                                    Our cleaning process is easy and thorough. First, our friendly team arrives on time, ready to make your home shine. 
                                    We start by tidying up each room and dusting all surfaces while removing dirt and allergens. 
                                    We clean countertops, appliances, and the sink in the kitchen so it shines. Bathrooms can get messy quickly, so we give them special attention, from scrubbing toilets to cleaning counters and wiping mirrors.
                                    If you’re looking for cleaning services near me that cover it all, Marias is the answer. We ensure that floors are vacuumed and mopped throughout the house, making them clean and fresh. 
                                    Want your bedrooms to be cozy retreats? Come home to neatly made beds and clutter-free rooms. We also tackle additional spaces, like hallways and entryways, to ensure no areas are overlooked.
                                    Whether you’re looking for recurring cleaning services, occasional cleaning, or helping with cleaning during a move, our goal is to leave your home spotless and inviting. We take care of the details so you can relax and enjoy your clean, comfortable space.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}