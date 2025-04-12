import { environment } from "../../environments/environment";
import "./Footer.css";

const Footer = () => {
  const { appName, author } = environment;
  const version = process.env.TAG_NAME;
  return (
    <div className="foot">
      {" "}
      {appName}&nbsp;[ver {version}]&nbsp;is developed by&nbsp;
      {author}
      <span
        className="mail-to"
        onClick={() => (window.location = "mailto:ashwijanayak@gmail.com")}
      >
        &nbsp;&#123;&nbsp;✉️&nbsp;&#125;
      </span>
    </div>
  );
};

export default Footer;
