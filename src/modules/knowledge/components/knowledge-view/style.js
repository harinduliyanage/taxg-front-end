import styled from "@emotion/styled";
import {
  Card as MuiCard,
  Grid as MuiGrid,
  Avatar as Logo,
  Button,
  TextField as MuiText,
} from "@mui/material";
import { spacing } from "@mui/system";

export const QuestionCard = styled(MuiGrid)`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  margin: 16px;

  width: 744px;
  height: 72px;

  /* Surface/Default */

  background: #ffffff;
  /* shadow-card

Used for Card
*/
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

export const AnswerCard1 = styled(MuiGrid)`
  /* Answer */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  margin: 12px;

  width: 744px;
  height: 272px;

  /* Surface/Default */

  background: #ffffff;
  /* shadow-card

Used for Card
*/
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

export const NewQuestionCard = styled(MuiGrid)`
  /* Question Input */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  margin: 16px;
  position: relative;
  width: 744px;
  height: 84px;

  /* Surface/Default */

  background: #ffffff;
  /* shadow-card

Used for Card
*/
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

export const SuggestedCard = styled(MuiGrid)`
  /* Suggested */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 24px;
  margin: 10px;

  position: relative;
  width: 356px;
  height: 562px;

  /* Surface/Default */

  background: #ffffff;
  /* shadow-card

Used for Card
*/
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

export const SuggestedCard2 = styled(MuiCard)`
  /* Suggested */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 24px;
  margin: 10px;

  position: relative;
  width: 356px;
  height: 184px;

  /* Surface/Default */

  background: #ffffff;
  /* shadow-card

Used for Card
*/
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

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

export const ViewButton = styled(Button)`
  /* Auto layout */
  text-transform: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 12px;
  margin: 10px;

  width: 308px;
  height: 30px;

  /* Action Secondary/Default */

  background: #ffffff;
  /* Border Neutral/Subdued */

  border: 1px solid #babfc3;
  /* shadow-button */

  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 2;
`;

export const PeopleGrid = styled(MuiCard)`
  /* People */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  margin: 20px;

  width: 259px;
  height: 412px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const PrimaryButton = styled(Button)`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  margin: 10px;

  width: 308px;
  height: 36px;

  /* Action Primary/Default */

  background: #302b6e;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.08),
    inset 0px -1px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;
export const Text = styled(MuiText)(spacing);
export const SearchField = styled(Text)`
  position: absolute;
  left: 1px;
  right: 1px;
  top: 1px;
  bottom: 1px;

  /* Surface Neutral/Disabled */

  // background: #F1F2F3;
  border-radius: 4px;
`;
