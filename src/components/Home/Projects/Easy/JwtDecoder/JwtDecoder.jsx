import { useEffect, useState } from "react";
import "./JwtDecoder.css";
import ProjectDisabled from "../../ProjectDisabled/ProjectDisabled";
import useProjectEnabled from "../../useProjectEnabled";

const JwtDecoder = () => {
  const isJwtDecoderEnabled = useProjectEnabled(
    "Mini Dom Projects",
    "Jwt Decoder"
  );
  const [jwtText, setJwtText] = useState("");
  const [payload, setPayload] = useState("");
  const [header, setHeader] = useState("");
  const [err, setErr] = useState("");

  const resetFn = () => {
    setPayload("{}");
    setHeader("{}");
  };

  useEffect(() => {
    if (!jwtText) {
      resetFn();
    }
  }, [jwtText]);

  const base64UrlDecode = (str) => {
    return atob(str);
  };

  const jwtTextHandler = (e) => {
    const jwtTextTemp = e.target.value;
    setJwtText(jwtTextTemp);

    const jwtParts = jwtTextTemp.split(".");

    try {
      setErr("");
      setHeader(base64UrlDecode(jwtParts[0]));
      setPayload(base64UrlDecode(jwtParts[1]));
      //const signature = jwtParts[2];
    } catch (err) {
      setErr("Invalid Signature");
    }
  };

  const headerChangeHandler = (e) => {
    setHeader(e.target.value);
  };

  const payloadChangeHandler = (e) => {
    setPayload(e.target.value);
  };

  return isJwtDecoderEnabled ? (
    <div className="jwt-container">
      <div>
        <div>Encoded</div>
        <textarea value={jwtText} onChange={jwtTextHandler} />
        <p>{err}</p>
      </div>
      <div>
        <div>Decoded</div>
        <div>
          <div>
            <div>Header</div>
            <textarea
              className="jwt-header"
              value={header}
              onChange={headerChangeHandler}
            />
          </div>
          <div>
            <div>Payload</div>
            <textarea
              className="jwt-payload"
              value={payload}
              onChange={payloadChangeHandler}
            />
          </div>
          <div>Signature</div>
          <div className="jwt-sign">
            <span>
              HMACSHA256( base64UrlEncode(header) + "." +
              base64UrlEncode(payload),
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ProjectDisabled projectName="Jwt Decoder" />
  );
};

export default JwtDecoder;
