import { Card, CardContent, CardActions, Skeleton, Box } from "@mui/material";

const ProjectCardSkeleton = ({
  imageHeight = 140,
  titleWidth = "60%",
  descriptionLines = 3,
  buttonCount = 2,
  sx = {},
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        ...sx,
      }}
    >
      {/* Image area */}
      <Box
        sx={{
          height: imageHeight,
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 1,
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      </Box>

      {/* Title + Description */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton
          variant="text"
          animation="wave"
          height={20}
          width={titleWidth}
          sx={{ mb: 1 }}
        />
        {Array.from({ length: descriptionLines }).map((_, idx) => (
          <Skeleton
            key={idx}
            variant="text"
            animation="wave"
            height={16}
            width={`${100 - idx * 5}%`}
            sx={{ mb: 0.5 }}
          />
        ))}
      </CardContent>

      {/* Buttons */}
      <CardActions>
        {Array.from({ length: buttonCount }).map((_, idx) => (
          <Skeleton
            key={idx}
            variant="rectangular"
            animation="wave"
            width={80}
            height={36}
            sx={{ borderRadius: 1, mr: 1 }}
          />
        ))}
      </CardActions>
    </Card>
  );
};

export default ProjectCardSkeleton;
