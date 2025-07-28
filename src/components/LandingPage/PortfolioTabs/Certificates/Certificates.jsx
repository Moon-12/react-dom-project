import { Grid, Box } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { fetchCertificate } from "../../../../redux/slice/certificateSlice";
import { useEffect } from "react";
import CertificateCard from "./CertificateCard/CertificateCard";
import ProjectCardSkeleton from "../../../Skeleton/ProjectCardSkeleton";

const CertificatesGrid = () => {
  const certificates = useSelector(
    (state) => state.certificateReducer.certificates
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCertificate());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3} justifyContent="center">
        {certificates.length > 0
          ? certificates.map((certificate) => (
              <Grid item xs={12} sm={6} md={4} key={certificate.id}>
                <CertificateCard certificate={certificate} />
              </Grid>
            ))
          : Array.from({ length: 1 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4}>
                <ProjectCardSkeleton
                  imageHeight={"14em"}
                  descriptionLines={0}
                  buttonCount={0}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default CertificatesGrid;
