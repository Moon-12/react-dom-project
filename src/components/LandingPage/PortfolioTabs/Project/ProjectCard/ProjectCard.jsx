import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
const ProjectCard = ({ projectInfo }) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        alt={projectInfo.name}
        image={projectInfo.imageUrl}
        sx={{
          height: 140,
          objectFit: "contain",
          backgroundColor: "#f5f5f5",
          p: 1,
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          sx={{ fontWeight: 600 }}
        >
          {projectInfo.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3, // show up to 3 lines
            WebkitBoxOrient: "vertical",
          }}
        >
          {projectInfo.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <a
            href={projectInfo.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            Live Demo
          </a>
        </Button>
        <Link to={`/project-details${projectInfo.route}`}>
          <Button size="small">Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
