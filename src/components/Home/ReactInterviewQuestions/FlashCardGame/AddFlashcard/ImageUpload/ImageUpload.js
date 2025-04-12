import { useState } from "react";
import Button from "@mui/material/Button";

import "./ImageUpload.css";
import { useFormContext } from "react-hook-form";

const ImageUpload = ({ fieldName }) => {
  const { register, setValue } = useFormContext();
  const [img, setImg] = useState("");

  const handleCancelFn = () => {
    setImg("");
    setValue(fieldName, "");
  };

  return (
    <div className="upload-img-container">
      <input
        name={fieldName}
        {...register(fieldName)}
        type="file"
        accept="image/*"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <Button onClick={handleCancelFn} disabled={!img} variant="contained">
        Cancel
      </Button>
    </div>
  );
};

export default ImageUpload;
