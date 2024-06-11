import { environment } from "../../environments/environment";
import "./Footer.css";

const Footer = () => {
  const { appName, version, author } = environment;
  return (
    <div className="foot">
      {" "}
      {appName}&nbsp;[ver {version}]&nbsp;is developed by&nbsp;
      {author}
      &nbsp;&#123;&nbsp;✉️&nbsp;&#125;
    </div>
  );
};

export default Footer;
