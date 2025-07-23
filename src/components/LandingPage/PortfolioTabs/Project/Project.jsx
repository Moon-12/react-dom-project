import { Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import ProjectCard from "./ProjectCard/ProjectCard";

const Project = () => {
  const cardProjects = useSelector((state) => state.header.cardProject);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3} justifyContent="center">
        {cardProjects.map((cardProject, index) => (
          <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
            <ProjectCard projectInfo={cardProject} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Project;
