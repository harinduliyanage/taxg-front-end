import {
  TextField as MuiTextField,
  IconButton as MuiIconButton,
  Avatar as MuiAvatar,
  Avatar as Logo,
  Badge,
  Box,
  Popover as MuiPopover,
  AppBar as MuiAppBar,
  Grid as MuiGrid,
  Tab,
} from "@mui/material";
import styled from "@emotion/styled";
import { spacing } from "@mui/system";

export const TextField = styled(MuiTextField)(spacing);
//
export const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;
//
export const Popover = styled(MuiPopover)`
  .MuiPaper-root {
    width: 300px;
    ${(props) => props.theme.shadows[1]};
    border: 1px solid;
  }
`;
//
export const Indicator = styled(Badge)`
  .MuiBadge-badge {
    color: "white";
  }
`;
//
export const Avatar = styled(MuiAvatar)``;
//
export const MessageHeader = styled(Box)`
  text-align: center;
  border-bottom: 1px solid;
`;
//
export const NotificationHeader = styled(Box)`
  text-align: center;
  border-bottom: 1px solid;
`;
//
export const AppBar = styled(MuiAppBar)`
  background: linear-gradient(
      0deg,
      rgba(23, 24, 24, 0.05),
      rgba(23, 24, 24, 0.05)
    ),
    linear-gradient(0deg, #ffffff, #ffffff);
`;
//
export const IconGrid = styled(MuiGrid)`
  height: 24px;
  width: 96px;
  left: 161px;
  top: 14px;
  border-radius: 0px;
`;
//
export const SmallAvatar = styled(Logo)`
  width: 96px;
  height: 24px;

  /* Action Primary/Default */

  // background: #302B6E;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;
//
export const TabLabel = styled(Tab)`
  //styleName: Desktop/Body;
  font-family: "SF-Pro-Text";
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
  text-transform: none;
  color: #6d7175;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 20px;
  margin: 10px;

  width: 98px;
  height: 52px;

  background: rgba(255, 255, 255, 0.01);

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;
