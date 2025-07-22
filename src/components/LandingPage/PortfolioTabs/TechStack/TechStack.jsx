import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { fetchTechStack } from "../../../../redux/slice/techstackSlice";
import { useDispatch, useSelector } from "react-redux";

const TechStackGrid = () => {
  const techStacks = useSelector((state) => state.techReducer.techStacks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTechStack());
  }, []);
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3} justifyContent="center">
        {techStacks.map((tech) => (
          <Grid item xs={6} sm={4} md={3} key={tech.id}>
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
                  component="img"
                  src={tech.url}
                  alt={tech.name}
                  sx={{
                    maxHeight: "70%", // scale to fit height
                    maxWidth: "70%", // scale to fit width
                    objectFit: "contain",
                    // prevent cut-off
                  }}
                />
                <Typography sx={{ fontWeight: "bold" }}>{tech.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TechStackGrid;
