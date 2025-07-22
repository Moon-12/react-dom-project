import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

import { useSelector } from "react-redux";

const CertificatesGrid = () => {
  const certificates = useSelector((state) => state.techReducer.certificates);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3} justifyContent="center">
        {certificates.map((certificate) => (
          <Grid item xs={6} sm={4} md={5} key={certificate.id}>
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CertificatesGrid;
