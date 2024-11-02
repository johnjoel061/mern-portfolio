import { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import "../styles/header.css";
import "../styles/home.css";
import "../styles/about.css";
import "../styles/portfolio.css";

import Profile from "../../assets/profile.jpg";
import HTMLImage from "../../assets/html-5.png";
import CSSImage from "../../assets/css-3.png";
import JavaScriptImage from "../../assets/js.png";
import PythonImage from "../../assets/python.png";
import ReactJSImage from "../../assets/physics.png";
import AboutImage from "../../assets/about.jpg";
import Resume from "../../assets/my_cv.pdf";


const Homepage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const [activeTab, setActiveTab] = useState("skills");
  const opentab = (tabname) => {
    setActiveTab(tabname);
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
            <h1 className="title">
              I'm{" "}
              <span>
                Joel
                <br />a
              </span>{" "}
              Full Stack & Blockchain Developer
            </h1>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sequi
              tempora deleniti. Odio, molestiae debitis quod aliquam consequatur
              aliquid unde atque molestias nihil sint vel. Nulla unde iste
              corporis deleniti.
            </p>
            <div className="action__btns">
              <a
                className="hire__me"
                href={Resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
              <a className="portfolio" href="#projects">
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
              <div className="about-col-1">
                <img src={AboutImage} alt="" />
              </div>

              <div className="about-col-2">
                <h1 className="sub-title">About Me</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                  soluta quidem, optio fuga et ducimus beatae sunt praesentium,
                  culpa placeat hic quo saepe! Dolor ut praesentium quibusdam
                  consequuntur laborum molestias!
                </p>
                <div className="tab-titles">
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
                </div>

                <div
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
                </div>
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

        
      </section>
    </>
  );
};

export default Homepage;
