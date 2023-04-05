import styled from "@emotion/styled";
import { Paper as MuiPaper, Grid as MuiGrid } from "@mui/material";
import { spacing } from "@mui/system";

export const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;
//
export const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;
//
export const Paper = styled(MuiPaper)(spacing);

export const Grid = styled(MuiGrid)(spacing);
//
export const MainContent = styled(Grid)`
  width: 1440px;
  height: 1024px;
  flex-direction: row;
  /* Background/Default */

  background: #f6f6f7;
`;
