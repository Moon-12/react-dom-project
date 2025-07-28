import { Card, CardContent, Typography, Box } from "@mui/material";
const TechStackCard = ({ tech }) => {
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
      <CardContent>
        <Box
          sx={{
            height: "6em",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <Box
            component="img"
            src={tech.url}
            alt={tech.name}
            sx={{
              width: "100%", // ensures full container width
              height: "100%", // auto height to preserve aspect ratio
              objectFit: "contain", // fits image inside box
              mb: 1, // spacing below image
            }}
          />
        </Box>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "0.9rem",
            textAlign: "center",
            wordBreak: "break-word", // ensures long names don’t overflow
          }}
        >
          {tech.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TechStackCard;
