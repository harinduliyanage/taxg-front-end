import { CssBaseline } from "@mui/material";
import { Navbar } from "../components/index";
import { AppContent, Root } from "./style";
import { KnowledgeView } from "../../knowledge/index";
/**
 * Parent dashboard layout define here. And also define global hooks
 * @returns
 */
const DashboardLayout = () => {
  //
  return (
    <Root>
      <CssBaseline />
      <AppContent>
        <Navbar />

        <KnowledgeView />
      </AppContent>
    </Root>
  );
};
//
export default DashboardLayout;
