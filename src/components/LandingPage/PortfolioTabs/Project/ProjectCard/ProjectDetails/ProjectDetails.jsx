import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { lighten } from "@mui/material/styles";

import {
  Box,
  Typography,
  Chip,
  Button,
  Grid,
  Paper,
  Stack,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const cardProjects = useSelector((state) => state.header.cardProject);
  const project = cardProjects.find(
    (cardProject) => cardProject.id === projectId
  );

  if (!project) return <Typography>Project not found</Typography>;

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          textTransform: "none",
          fontWeight: 600,
          color: "primary.main",
          borderColor: "primary.main",
          "&:hover": {
            backgroundColor: "primary.light",
            borderColor: "primary.dark",
          },
        }}
      >
        ← Back
      </Button>
      <Grid container spacing={4}>
        {/* Left Side */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
            <Typography
              variant="h3"
              fontWeight={700}
              gutterBottom
              color="primary.dark"
            >
              {project.name}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {project.description}
            </Typography>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} mb={3}>
              <Button
                variant="contained"
                color="primary"
                href={project.liveDemoUrl}
                target="_blank"
                sx={{
                  px: 3,
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: 2,
                }}
              >
                🚀 Live Demo
              </Button>
              <Button
                variant="contained"
                color="secondary"
                href={project.githubUrl}
                target="_blank"
                sx={{ px: 3, fontWeight: 600, textTransform: "none" }}
              >
                💻 GitHub
              </Button>
            </Stack>

            {/* Technologies */}
            <Typography variant="h6" fontWeight={600} mb={1}>
              Technologies Used:
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              sx={{ rowGap: 1, columnGap: 1 }}
            >
              {project.technologies.map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  icon={<span style={{ fontSize: "1rem" }}>💡</span>}
                  sx={(theme) => ({
                    cursor: "pointer",
                    mb: 1,
                    px: 1.5,
                    py: 0.5,
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    backgroundColor: lighten(theme.palette.primary.main, 0.9),
                    borderRadius: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    "& .MuiChip-icon": {
                      marginLeft: "4px",
                      color: "#ffff00",
                    },
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      transform: "scale(1.05)",
                      transition: "all 0.3s ease-in-out",
                    },
                  })}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={4}>
          <CardMedia
            component="img"
            image={project.imageUrl}
            alt={`${project.name} icon`}
            sx={{
              height: 200,
              objectFit: "contain",
              borderRadius: 3,
              backgroundColor: "#fff",
              p: 1,
              mb: 3,
              boxShadow: 1,
            }}
          />

          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              🔑 Key Features
            </Typography>

            <List dense>
              {Object.entries(project.keyFeatures).map(([key, value]) => (
                <ListItem key={key} alignItems="flex-start" sx={{ mb: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight={500}>
                        {key}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {value}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectDetails;
