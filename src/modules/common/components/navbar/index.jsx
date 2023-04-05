import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import NotificationImportantOutlined from "@mui/icons-material/NotificationImportantOutlined";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Tabs from "@mui/material/Tabs";
import { SmallAvatar, AppBar, TabLabel } from "./style";

const NavBar = () => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <SmallAvatar variant="square" src="/Taxglobal.png" />
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Tabs
              centered
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#47A279",
                },
              }}
            >
              <TabLabel label="My Feed" value={1} />
              <TabLabel label="Discover" value={2} />
              <TabLabel label="Knowledge" value={3} />
              <TabLabel label="Resources" value={4} />
              <TabLabel label="Extended Teams" value={5} />
            </Tabs>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ mx: 5 }}>
              <NotificationImportantOutlined color="black" />
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
