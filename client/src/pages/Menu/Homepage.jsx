import { useState } from "react";
import { FileTextOutlined } from "@ant-design/icons";

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

import useGetAllSkill from "../../hooks/SkillHook/useGetAllSkill";
import useGetAllExperience from "../../hooks/ExperienceHook/useGetAllExperience";
import useGetAllEducationHook from "../../hooks/EducationHook/useGetAllEducationHook";
import useGetAllCertification from "../../hooks/CertificationHook/useGetAllCertification";
import useGetAllPortfolio from "../../hooks/PortfolioHook/useGetAllPortfolio";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

import { Card, Tag, Button, Typography, Space } from "antd";
import {
  GithubOutlined,
  LinkOutlined,
  MailOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import { SiTiktok } from "react-icons/si";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Homepage = () => {
  const { Title, Paragraph, Text, Link } = Typography;
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const { skills, skillLoading } = useGetAllSkill();
  const { experiences, experienceLoading } = useGetAllExperience();
  const { education, educationLoading } = useGetAllEducationHook();
  const { certifications, certificateLoading } = useGetAllCertification();
  const { portfolios, portfolioLoading } = useGetAllPortfolio();

  const [activeTab, setActiveTab] = useState("skills");
  const opentab = (tabname) => {
    setActiveTab(tabname);
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
                A hard-working and geek person with a keen interest in full
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
                  {skillLoading ? (
                    <p>Loading skills...</p>
                  ) : (
                    <ul>
                      {skills?.map((skill, index) => (
                        <li key={index}>
                          <span>{skill.skillName}</span>
                          <br />
                          {skill.skillDescription}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  variants={divVariants}
                  transition={{ duration: 0.5 }}
                  className={`tab-contents ${
                    activeTab === "experience" ? "active-tab" : ""
                  }`}
                  id="experience"
                >
                  {experienceLoading ? (
                    <p>Loading experiences...</p>
                  ) : (
                    <ul style={{ padding: 0, listStyle: "none" }}>
                      {experiences?.map((exp, index) => (
                        <li key={index}>
                          <span>
                            <b>{exp.experienceName}</b>
                          </span>
                          <br />
                          <span>
                            <i>{exp.companyName}</i>
                          </span>
                          <br />
                          <span style={{ fontSize: "13px" }}>
                            {exp.experienceDate}
                          </span>
                          <br />
                          <span style={{ color: "#ababab" }}>
                            {exp.experienceDescription}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  variants={divVariants}
                  transition={{ duration: 0.5 }}
                  className={`tab-contents ${
                    activeTab === "education" ? "active-tab" : ""
                  }`}
                  id="education"
                >
                  {educationLoading ? (
                    <p>Loading education...</p>
                  ) : (
                    <ul>
                      {education?.map((exp, index) => (
                        <li key={index}>
                          <span>
                            <b>{exp.educationName}</b>
                          </span>
                          <br />
                          <span>
                            <i>{exp.courseName}</i>
                          </span>
                          <br />
                          <span style={{ color: "#ababab" }}>
                            {exp.educationDate}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>

                <div className="tech-stack">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={divVariants}
                    transition={{ duration: 0.5 }}
                    className="sub-title"
                  >
                    Tools & Technologies
                  </motion.div>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={divVariants}
                    transition={{ duration: 0.8 }}
                    className="techStack-container"
                  >
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
                  </motion.div>
                </div>
              </div>
            </div>

            <SectionTitle title="Certifications" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={divVariants}
              transition={{ duration: 0.8 }}
              className="certification-container"
            >
              {certificateLoading ? (
                <p>Loading certificates...</p>
              ) : (
                certifications
                  ?.sort(
                    (a, b) =>
                      new Date(b.certificationDate) -
                      new Date(a.certificationDate)
                  )
                  .map((cert, index) => (
                    <Card
                      key={index}
                      style={{
                        maxWidth: 400,
                        margin: "1rem auto",
                        borderRadius: "16px",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                      }}
                      bodyStyle={{ padding: "20px" }}
                    >
                      <Title level={4} style={{ marginBottom: "0.5rem" }}>
                        {cert.certificationName}
                      </Title>

                      <Paragraph
                        style={{
                          color: "#595959",
                          marginBottom: "1rem",
                          minHeight: "60px", // ensures all descriptions align
                        }}
                      >
                        {cert.certificationDescription}
                      </Paragraph>

                      <Text
                        type="secondary"
                        style={{ display: "block", marginBottom: "1rem" }}
                      >
                        Date Issued:{" "}
                        {new Date(cert.certificationDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </Text>

                      <Space>
                        <Button
                          type="primary"
                          style={{
                            backgroundColor: "#1f2937",
                          }}
                          icon={<FileTextOutlined />}
                          href={cert.certificationLink}
                          target="_blank"
                        >
                          View Certificate
                        </Button>
                      </Space>
                    </Card>
                  ))
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="project-section" id="portfolio">
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={divVariants}
          transition={{ duration: 0.5 }}
          className="section__text__p1"
        >
          Browse My Recent
        </motion.p>
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={divVariants}
          transition={{ duration: 0.8 }}
          className="portfolio-title"
        >
          Projects
        </motion.h1>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={divVariants}
          transition={{ duration: 0.8 }}
          className="slider-container"
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {portfolios?.map((port, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{
                  flex: "1 1 300px",
                  maxWidth: "400px",
                  display: "flex",
                }}
              >
                <motion.Card
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.2 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#ffff",
                    flex: 1,
                    borderRadius: "16px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                  }}
                  bodyStyle={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <div>
                    <Title level={4} style={{ marginBottom: "0.5rem" }}>
                      {port.projectTitle}
                    </Title>
                    <Paragraph
                      style={{
                        color: "#595959",
                        marginBottom: "1rem",
                        minHeight: "80px",
                      }}
                    >
                      {port.projectDescription}
                    </Paragraph>

                    <Space
                      wrap
                      style={{
                        marginBottom: "1rem",
                        minHeight: "30px",
                      }}
                    >
                      {port.projectTechStack.map((tech, i) => (
                        <Tag color="#1f2937" key={i}>
                          {tech}
                        </Tag>
                      ))}
                    </Space>
                  </div>

                  <Space style={{ marginTop: "auto" }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#1f2937" }}
                      icon={<GithubOutlined />}
                      href={port.projectGithubUrl}
                      target="_blank"
                    >
                      GitHub
                    </Button>
                    <Button
                      className="custom-demo-btn"
                      type="default"
                      icon={<LinkOutlined />}
                      href={port.projectDemoUrl}
                      target="_blank"
                    >
                      Live Demo
                    </Button>
                  </Space>
                </motion.Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="testimonial-section" id="testimonials">
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={divVariants}
          transition={{ duration: 0.5 }}
          className="testimonial__text__p1"
        >
          My Client
        </motion.p>
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={divVariants}
          transition={{ duration: 0.8 }}
          className="testimonial-title"
        >
          Testimonials
        </motion.h1>

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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "4rem 1rem",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography.Title
                level={2}
                style={{
                  maxWidth: 700,
                  color: "#1f2937",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                  marginBottom: "1rem",
                }}
              >
                Let’s Connect!
              </Typography.Title>

              <Typography.Paragraph
                style={{
                  maxWidth: 700,
                  fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                  color: "#4b5563",
                  textAlign: "center",
                }}
              >
                Have a project in mind or just want to say hi? Feel free to
                reach out — I’m always open to new ideas, collaborations, or
                just a good conversation.
              </Typography.Paragraph>

              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={divVariants}
                transition={{ duration: 0.8 }}
                style={{
                  width: "100%",
                  maxWidth: 600,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr", // two columns on larger screens
                  gap: "1.5rem",
                  padding: "1rem",
                }}
                className="responsive-grid"
              >
                <Card
                  hoverable
                  style={{
                    maxWidth: 360,
                    margin: "0 auto",
                    borderRadius: 16,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    background: "#ffffff",
                  }}
                  bodyStyle={{ padding: 20 }}
                >
                  <Space align="start">
                    <MailOutlined
                      style={{
                        fontSize: "24px",
                        color: "#1f2937",
                        marginTop: 4,
                      }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ fontSize: "16px", color: "#1f2937" }}
                      >
                        Email
                      </Text>
                      <br />
                      <Link
                        href="mailto:youremail@example.com"
                        style={{ fontSize: "14px", color: "#4b5563" }}
                      >
                        youremail@example.com
                      </Link>
                    </div>
                  </Space>
                </Card>

                <Card
                  hoverable
                  style={{
                    maxWidth: 360,
                    margin: "0 auto",
                    borderRadius: 16,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    background: "#ffffff",
                  }}
                  bodyStyle={{ padding: 20 }}
                >
                  <Space align="start">
                    <FacebookFilled
                      style={{
                        fontSize: "24px",
                        color: "#1f2937",
                        marginTop: 4,
                      }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ fontSize: "16px", color: "#1f2937" }}
                      >
                        Facebook
                      </Text>
                      <br />
                      <Link
                        href="https://facebook.com/yourprofile"
                        style={{ fontSize: "14px", color: "#4b5563" }}
                      >
                        facebook.com/yourprofile
                      </Link>
                    </div>
                  </Space>
                </Card>

                <Card
                  hoverable
                  style={{
                    maxWidth: 360,
                    margin: "0 auto",
                    borderRadius: 16,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    background: "#ffffff",
                  }}
                  bodyStyle={{ padding: 20 }}
                >
                  <Space align="start">
                    <GithubOutlined
                      style={{
                        fontSize: "24px",
                        color: "#1f2937",
                        marginTop: 4,
                      }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ fontSize: "16px", color: "#1f2937" }}
                      >
                        GitHub
                      </Text>
                      <br />
                      <Link
                        href="https://github.com/yourusername"
                        style={{ fontSize: "14px", color: "#4b5563" }}
                      >
                        github.com/yourusername
                      </Link>
                    </div>
                  </Space>
                </Card>

                <Card
                  hoverable
                  style={{
                    maxWidth: 360,
                    margin: "0 auto",
                    borderRadius: 16,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    background: "#ffffff",
                  }}
                  bodyStyle={{ padding: 20 }}
                >
                  <Space align="start">
                    <SiTiktok
                      style={{
                        fontSize: "24px",
                        color: "#1f2937",
                        marginTop: 4,
                      }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ fontSize: "16px", color: "#1f2937" }}
                      >
                        TikTok
                      </Text>
                      <br />
                      <Link
                        href="https://tiktok.com/@yourhandle"
                        style={{ fontSize: "14px", color: "#4b5563" }}
                      >
                        tiktok.com/@yourhandle
                      </Link>
                    </div>
                  </Space>
                </Card>
              </motion.div>
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
