import { Button, Typography } from "@mui/material";
import logo from "../../../assets/projectlogo.png";
import "./AboutMe.css";
import { forwardRef } from "react";
const AboutMe = forwardRef((props, ref) => {
  return (
    <div className="about-me-wrapper" ref={ref}>
      <div className="profile-abt-me-wrapper">
        <div className="profile-img-wrapper">
          <img className="profile-img" src={logo} />
        </div>
        <div className="about-me-content">
          <Typography>About Me</Typography>
          <Typography>
            I am a passionate software engineer with over 5 years of experience
            in the industry. My expertise lies in C#, JavaScript, React, and
            Node.js, which I use to develop innovative web solutions. I thrive
            in environments that require strong project management skills and
            the ability to lead teams towards achieving common goals. My
            proficiency in cloud technologies like AWS and Azure allows me to
            design and implement scalable and efficient systems. Known for my
            attention to detail and commitment to excellence, I consistently
            deliver high-quality solutions within tight deadlines. I am a
            proactive problem-solver, always eager to embrace new challenges and
            stay ahead in the ever-evolving tech landscape.
          </Typography>
        </div>
      </div>
      <div className="contact-details-wrapper">
        <div className="contact-details">
          <Typography>Contact Details</Typography>

          <Typography>Ashwija Nayak </Typography>
          <Typography>2819</Typography>
          <Typography>ashwijanayak@gmail.com</Typography>
        </div>
        <Button variant="contained" className="download-resume-btn">
          Download Resume
        </Button>
      </div>
    </div>
  );
});
export default AboutMe;
