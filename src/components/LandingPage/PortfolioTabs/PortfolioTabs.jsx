import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProjectCard from "./ProjectCard/ProjectCard";
import TechStackGrid from "./TechStack/TechStack";
import CertificatesGrid from "./Certificates/Certificates";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PortfolioTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          p: 1,
          mb: 2,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            display: "flex",
            gap: 2,
            "& .MuiTab-root": {
              flexGrow: 1,
              minWidth: 0, // ensures tabs shrink if needed
              justifyContent: "center", // center text
            },
            "& .Mui-selected": {
              backgroundColor: "#d0e3ff", // 🔵 box-style highlight for selected tab
              fontWeight: "bold",
            },
          }}
        >
          <Tab label="Projects" {...a11yProps(0)} />
          <Tab label="Certificates" {...a11yProps(1)} />
          <Tab label="Tech Stack" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProjectCard />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CertificatesGrid />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TechStackGrid />
      </CustomTabPanel>
    </Box>
  );
};
export default PortfolioTabs;
