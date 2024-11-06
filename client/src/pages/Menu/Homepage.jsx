import { useState, useRef } from "react";
import {
  FaPaperPlane,
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import "../styles/header.css";
import "../styles/home.css";
import "../styles/about.css";
import "../styles/portfolio.css";
import "../styles/testimonials.css";
import "../styles/contact.css";
import "../styles/footer.css";

import Profile from "../../assets/profile.jpg";
import HTMLImage from "../../assets/html-5.png";
import CSSImage from "../../assets/css-3.png";
import JavaScriptImage from "../../assets/js.png";
import PythonImage from "../../assets/python.png";
import ReactJSImage from "../../assets/physics.png";
import AboutImage from "../../assets/about.jpg";
import Resume from "../../assets/my_cv.pdf";

import Image1 from "../../assets/image/img1.jpg";
import Image2 from "../../assets/image/img2.jpg";
import Image3 from "../../assets/image/img3.jpg";
import Image4 from "../../assets/image/img4.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Homepage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const [activeTab, setActiveTab] = useState("skills");
  const opentab = (tabname) => {
    setActiveTab(tabname);
  };

  const sliderListRef = useRef(null);
  const thumbnailRef = useRef(null);

  const moveSlider = (direction) => {
    const sliderList = sliderListRef.current;
    const thumbnail = thumbnailRef.current;

    if (sliderList && thumbnail) {
      const sliderItems = sliderList.querySelectorAll(".item");
      const thumbnailItems = thumbnail.querySelectorAll(".item");

      if (direction === "next") {
        sliderList.appendChild(sliderItems[0]);
        thumbnail.appendChild(thumbnailItems[0]);
        sliderList.classList.add("next");
      } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1]);
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
        sliderList.classList.add("prev");
      }

      sliderList.addEventListener(
        "animationend",
        () => {
          sliderList.classList.remove(direction);
        },
        { once: true }
      );
    }
  };

  // Animation settings
  const divVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <header>
        <div className="logo" href="#home">
          ALFABETE
        </div>
        <div className="hamburger" onClick={toggleNav}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className={`nav-bar ${isNavOpen ? "active" : ""}`}>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </header>

      <section className="section" id="home">
        <div className="section__container">
          <div className="content">
            <p className="subtitle">HELLO</p>
            <motion.h1
              initial="hidden"
              whileInView="visible"
              variants={divVariants}
              transition={{ duration: 0.5 }}
              className="title"
            >
              I'm{" "}
              <span>
                Joel
                <br />a
              </span>{" "}
              Full Stack Developer
            </motion.h1>
            <motion.div
              initial="hidden" // Initial state of the card
              whileInView="visible" // Trigger animation when in view
              variants={divVariants} // Use the animation settings
              transition={{ duration: 0.8 }} // Animation duration
              className="description"
            >
              <p>
                A 4th-year Computer Science student with a keen interest in full
                stack development. Proficient in a range of technologies,
                including React, Node.js, and MongoDB, I excel at creating
                comprehensive web applications that cover both front-end and
                back-end development.
              </p>
            </motion.div>
            <div className="action__btns">
              <a
                className="hire__me"
                href={Resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
              <a className="portfolio" href="#portfolio">
                Portfolio
              </a>
            </div>
          </div>
          <div className="image">
            <img src={Profile} alt="Profile of Joel" />
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about">
          <div className="container">
            <div className="row">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={divVariants}
                transition={{ duration: 0.8 }}
                className="about-col-1"
              >
                <img src={AboutImage} alt="" />
              </motion.div>

              <div className="about-col-2">
                <motion.h1
                  initial="hidden"
                  whileInView="visible"
                  variants={divVariants}
                  transition={{ duration: 0.8 }}
                  className="sub-title"
                >
                  About Me
                </motion.h1>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  variants={divVariants}
                  transition={{ duration: 0.8 }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                  soluta quidem, optio fuga et ducimus beatae sunt praesentium,
                  culpa placeat hic quo saepe! Dolor ut praesentium quibusdam
                  consequuntur laborum molestias!
                </motion.p>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  variants={divVariants}
                  transition={{ duration: 0.8 }}
                  className="tab-titles"
                >
                  <p
                    className={`tab-links ${
                      activeTab === "skills" ? "active-link" : ""
                    }`}
                    onClick={() => opentab("skills")}
                  >
                    Skills
                  </p>
                  <p
                    className={`tab-links ${
                      activeTab === "experience" ? "active-link" : ""
                    }`}
                    onClick={() => opentab("experience")}
                  >
                    Experience
                  </p>
                  <p
                    className={`tab-links ${
                      activeTab === "education" ? "active-link" : ""
                    }`}
                    onClick={() => opentab("education")}
                  >
                    Education
                  </p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  variants={divVariants}
                  transition={{ duration: 0.5 }}
                  className={`tab-contents ${
                    activeTab === "skills" ? "active-tab" : ""
                  }`}
                  id="skills"
                >
                  <ul>
                    <li>
                      <span>Python Programming</span>
                      <br />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni, perspiciatis est nemo doloremque vel delectus
                      quisquam, fugiat quos suscipit voluptatum numquam odit,
                      exercitationem expedita deserunt ullam! Beatae debitis
                      earum illum?
                    </li>
                  </ul>
                </motion.div>

                <div
                  className={`tab-contents ${
                    activeTab === "experience" ? "active-tab" : ""
                  }`}
                  id="experience"
                >
                  <ul>
                    <li>
                      <span>2019</span>
                      <br />
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Consectetur aperiam at adipisci debitis mollitia doloribus
                      quia consequuntur architecto sed. Nemo, ut omnis commodi
                      hic similique at possimus cupiditate voluptates harum.
                    </li>
                  </ul>
                </div>
                <div
                  className={`tab-contents ${
                    activeTab === "education" ? "active-tab" : ""
                  }`}
                  id="education"
                >
                  <ul>
                    <li>
                      <span>2013</span>
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Ipsa nobis amet, praesentium neque necessitatibus
                      distinctio? Maiores mollitia molestias temporibus odio
                      delectus quisquam est! Omnis reiciendis velit nulla quo
                      aperiam repellendus.
                    </li>
                  </ul>
                </div>

                <div className="tech-stack">
                  <h1 className="sub-title">Tech Stack</h1>

                  <div className="techStack-container">
                    <div className="techStack-content">
                      <img src={HTMLImage} alt="" />
                    </div>

                    <div className="techStack-content">
                      <img src={CSSImage} alt="" />
                    </div>

                    <div className="techStack-content">
                      <img src={JavaScriptImage} alt="" />
                    </div>

                    <div className="techStack-content">
                      <img src={CSSImage} alt="" />
                    </div>

                    <div className="techStack-content">
                      <img src={JavaScriptImage} alt="" />
                    </div>

                    <div className="techStack-content">
                      <img src={PythonImage} alt="" />
                    </div>

                    <div className="techStack-content">
                      <img src={ReactJSImage} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <SectionTitle title="Certifications" />
            <div className="certification-container">
              <div className="card">
                <h3 className="card__title">Responsive Web Certification</h3>
                <p className="card__content">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Possimus nemo adipisci corporis eos necessitatibus at, dolores
                  aliquid ipsa sapiente! Id, fugiat reiciendis tempore itaque
                  iusto quis quos eius enim ducimus?
                </p>
                <div className="card__date">June 12, 2023</div>
                <div className="card__arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="15"
                    width="15"
                  >
                    <path
                      fill="#fff"
                      d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="project-section" id="portfolio">
        <p className="section__text__p1">Browse My Recent</p>
        <h1 className="portfolio-title">Projects</h1>

        <div className="slider-container">
          <div className="slider">
            <div className="list" ref={sliderListRef}>
              <div className="item">
                <img src={Image1} alt="" />
                <div className="content">
                  <div className="title">MAGIC SLIDER</div>
                  <div className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti temporibus quis eum consequuntur voluptate quae
                    doloribus distinctio. Possimus, sed recusandae. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Sequi, aut.
                  </div>
                  <div className="button">
                    <button>DEMO</button>
                    <button>SOURCE CODE</button>
                  </div>
                </div>
              </div>

              <div className="item">
                <img src={Image2} alt="" />
                <div className="content">
                  <div className="title">MAGIC SLIDER</div>
                  <div className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti temporibus quis eum consequuntur voluptate quae
                    doloribus distinctio. Possimus, sed recusandae. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Sequi, aut.
                  </div>
                  <div className="button">
                    <button>DEMO</button>
                    <button>SOURCE CODE</button>
                  </div>
                </div>
              </div>

              <div className="item">
                <img src={Image4} alt="" />

                <div className="content">
                  <div className="title">MAGIC SLIDER</div>
                  <div className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti temporibus quis eum consequuntur voluptate quae
                    doloribus distinctio. Possimus, sed recusandae. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Sequi, aut.
                  </div>
                  <div className="button">
                    <button>DEMO</button>
                    <button>SOURCE CODE</button>
                  </div>
                </div>
              </div>

              <div className="item">
                <img src={Image3} alt="" />

                <div className="content">
                  <div className="title">MAGIC SLIDER</div>
                  <div className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti temporibus quis eum consequuntur voluptate quae
                    doloribus distinctio. Possimus, sed recusandae. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Sequi, aut.
                  </div>
                  <div className="button">
                    <button>DEMO</button>
                    <button>SOURCE CODE</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="thumbnail" ref={thumbnailRef}>
              <div className="item">
                <img src={Image1} alt="" />
              </div>
              <div className="item">
                <img src={Image2} alt="" />
              </div>
              <div className="item">
                <img src={Image3} alt="" />
              </div>
              <div className="item">
                <img src={Image4} alt="" />
              </div>
            </div>

            <div className="nextPrevArrows">
              <button className="prev" onClick={() => moveSlider("prev")}>
                {" "}
                {"<"}{" "}
              </button>
              <button className="next" onClick={() => moveSlider("next")}>
                {" "}
                {">"}{" "}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-section" id="testimonials">
        <p className="testimonial__text__p1">My Client</p>
        <h1 className="testimonial-title">Testimonials</h1>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="testimonial-container">
              <figure className="snip1157 hover">
                <blockquote>
                  Thank you. before I begin, I'd like everyone to notice that my
                  report is in a professional, clear plastic binder...When a
                  report looks this good, you know it'll get an A. That's a tip
                  kids. Write it down.
                  <div className="arrow"></div>
                </blockquote>
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample27.jpg"
                  alt="sq-sample27"
                />
                <div className="author">
                  <h5>
                    Max Conversion<span> LIttleSnippets.net</span>
                  </h5>
                </div>
              </figure>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="testimonial-container">
              <figure className="snip1157 hover">
                <blockquote>
                  Thank you. before I begin, I'd like everyone to notice that my
                  report is in a professional, clear plastic binder...When a
                  report looks this good, you know it'll get an A. That's a tip
                  kids. Write it down.
                  <div className="arrow"></div>
                </blockquote>
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample27.jpg"
                  alt="sq-sample27"
                />
                <div className="author">
                  <h5>
                    Max Conversion<span> LIttleSnippets.net</span>
                  </h5>
                </div>
              </figure>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact">
          <div className="container">
            <div className="row">
              <div className="contact-left">
                <h1 className="sub-title">Contact Me</h1>
                <p>
                  <FaPaperPlane className="email-icon" />
                  alfabetejohnjoel@gmail.com
                </p>
                <div className="social-icons">
                  <a href="#">
                    <FaFacebook />
                  </a>
                  <a href="#">
                    <FaInstagram />
                  </a>
                  <a href="#">
                    <FaTiktok />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="footer">
        <p>
          <a href="#home">© 2024 John Joel Alfabete. All rights reserved.</a>
        </p>
      </div>
    </>
  );
};

export default Homepage;
