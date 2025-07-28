import { Grid, Box } from "@mui/material";
import { useEffect } from "react";
import { fetchTechStack } from "../../../../redux/slice/techstackSlice";
import { useDispatch, useSelector } from "react-redux";
import TechStackCard from "./TechStackCard/TechStackCard";
import ProjectCardSkeleton from "../../../Skeleton/ProjectCardSkeleton";

const TechStackGrid = () => {
  const techStacks = useSelector((state) => state.techReducer.techStacks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTechStack());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3} justifyContent="center">
        {techStacks.length > 0
          ? techStacks.map((tech) => (
              <Grid item xs={12} sm={6} md={3} key={tech.id}>
                <TechStackCard tech={tech} />
              </Grid>
            ))
          : Array.from({ length: 16 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <ProjectCardSkeleton
                  imageHeight={"6em"}
                  descriptionLines={0}
                  buttonCount={0}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default TechStackGrid;
