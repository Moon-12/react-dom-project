import { Card, Box, Typography } from "@mui/material";
const CertificateCard = ({ certificate }) => {
  return (
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
          sx={{
            height: "14em",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <Box
            component="img"
            src={certificate.icon}
            alt={certificate.name}
            sx={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
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
  );
};

export default CertificateCard;
