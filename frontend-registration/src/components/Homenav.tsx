import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Registration from "./Registration";
import Authentification from "./Authentification";
import { Link } from "react-router-dom";

export default function Homenav() {
  const [currentRoute, setCurrentRoute] = React.useState("registration");
  React.useEffect(() => {
    const path = window.location.pathname.toLocaleLowerCase();
    setCurrentRoute(path.slice(1, path.length));
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentRoute(newValue);
  };
  return (
    <Box>
      <Tabs
        value={currentRoute}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="primary"
      >
        <Tab
          value="registration"
          label="Registration"
          component={Link}
          to="/registration"
        />
        <Tab
          value="authentification"
          label="Sing in"
          component={Link}
          to="/authentification"
        />
      </Tabs>
      {currentRoute === "registration" && <Registration />}
      {currentRoute === "authentification" && <Authentification />}
    </Box>
  );
}
