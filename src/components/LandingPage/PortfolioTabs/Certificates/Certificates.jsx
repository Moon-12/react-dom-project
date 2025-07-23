import { Grid, Card, Box, Typography } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { fetchCertificate } from "../../../../redux/slice/certificateSlice";
import { useEffect } from "react";

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
        {certificates.map((certificate) => (
          <Grid item xs={12} sm={6} md={4} key={certificate.id}>
            <Card
              variant="outlined"
              sx={{
                textAlign: "center",
                p: 2,
                borderRadius: "1em",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                },
              }}
            >
              <a
                href={certificate.badgeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textAlign: "center" }}
              >
                <Box
                  component="img"
                  src={certificate.icon}
                  alt={certificate.name}
                  sx={{
                    maxHeight: "100%", // scale to fit height
                    maxWidth: "100%", // scale to fit width
                    objectFit: "contain",
                    // prevent cut-off
                  }}
                />
              </a>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  wordBreak: "break-word", // ensures long names don’t overflow
                }}
              >
                {certificate.name}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CertificatesGrid;
