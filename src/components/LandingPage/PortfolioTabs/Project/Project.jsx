import { Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import ProjectCard from "./ProjectCard/ProjectCard";
import ProjectCardSkeleton from "../../../Skeleton/ProjectCardSkeleton";

const Project = () => {
  const cardProjects = useSelector((state) => state.header.cardProject);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3} justifyContent="center">
        {cardProjects.length > 0
          ? cardProjects.map((cardProject, index) => (
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                sx={{ height: "23em" }}
              >
                <ProjectCard projectInfo={cardProject} />
              </Grid>
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={6} lg={4} sx={{ height: "23em" }}>
                <ProjectCardSkeleton />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default Project;
