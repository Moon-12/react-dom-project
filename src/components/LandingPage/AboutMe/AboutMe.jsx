import { Button, Typography } from "@mui/material";
import logo from "../../../assets/projectlogo.png";
import "./AboutMe.css";
import { forwardRef } from "react";
import DownloadIcon from "@mui/icons-material/Download";

const AboutMe = forwardRef((props, ref) => {
  return (
    <div className="about-me-parent-wrapper">
      <div className="about-me-wrapper" ref={ref}>
        <div className="profile-img-wrapper">
          <img className="profile-img" src={logo} />
        </div>
        <div className="about-me-content">
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            About Me
          </Typography>
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
        <div className="contact-resume-wrapper">
          <div className="contact-details">
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Contact Details
            </Typography>

            <Typography>Ashwija Nayak </Typography>
            <Typography>(281) 954-1710</Typography>
            <Typography>ashwijanayak@gmail.com</Typography>
          </div>
          <a
            href={`https://firebasestorage.googleapis.com/v0/b/ashwija-nayak.appspot.com/o/assets%2FAshwija%20Nayak%20Resume.pdf?alt=media&token=${process.env.REACT_APP_RESUME_TOKEN}`}
            target="_blank"
            rel="noopener noreferrer"
            className="download-resume-link"
          >
            <Button variant="contained" className="download-resume-btn">
              <DownloadIcon />
              <div className="download-btn-text">Download Resume</div>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
});
export default AboutMe;
