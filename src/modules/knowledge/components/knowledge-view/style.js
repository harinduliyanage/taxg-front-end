import styled from "@emotion/styled";
import {
  Card as MuiCard,
  Grid as MuiGrid,
  Avatar as Logo,
  Button,
  TextField as MuiText,
  Typography,
  Grid,
  IconButton,
  Avatar,
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
  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  margin: 12px;

  position: relative;
  width: 744px;
  height: auto;

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
  align-self: center;

  width: 744px;
  height: 84px;
  position: relative;

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
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 5px;

  width: 280px;
  height: 30px;
  text-transform: none;

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
  align-self: stretch;
  flex-grow: 0;
`;

export const PeopleGrid = styled(Grid)`
  /* People */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  margin: 20px;

  width: 259px;
  height: auto;

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

export const ProvidersHeading = styled(Typography)`
  width: 214px;
  height: 24px;

  /* Desktop/Heading */

  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;

  /* Text/Default */

  color: #202223;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const ViewQuestionCard = styled(Typography)`
  width: 696px;
  height: 160px;

  /* Desktop/Body */

  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  /* Text/Default */

  color: #202223;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;
export const BottomCard = styled(Grid)`
  /* Bottom */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0px;
  margin: 12px;

  width: 696px;
  height: 52px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const RateCard = styled(Grid)`
  /* Rate */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  margin-right: 5px;

  width: 72px;
  height: 36px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const RateButton1 = styled(IconButton)`
  /* Basic button

Used most in the interface. Only use another style if a button requires more or less visual weight.
*/

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 36px;
  height: 36px;

  border-radius: 4px 0px 0px 4px;
  border: 1px solid rgba(186, 191, 195, 1);
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05);

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const OutLinedButton = styled(Button)`
  /* Outline button

Used most in the interface. Only use another style if a button requires more or less visual weight.
*/

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  text-transform: none;

  width: 142px;
  height: 36px;

  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.01);
  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const QuestionIcon = styled(Avatar)`
  /* chat_major */

  width: 20px;
  height: 20px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SourceCard = styled(Grid)`
  /* Sources */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  margin: 4px;

  width: 696px;
  height: 68px;

  /* Inside auto layout */

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
`;
export const LinkText = styled(Typography)`
  /* Link */

  width: 696px;
  height: 20px;

  /* Desktop/Button */

  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  /* Action Primary/Default */

  color: #302b6e;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const Person = styled(Grid)`
  /* Person */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  margin: 16px;
  justify-content: space-between;

  width: 192px;
  height: 52px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const Frame1 = styled(Grid)`
  /* Frame 1 */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 124px;
  height: 40px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const Content = styled(Grid)`
  /* Content */

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  margin: 24px;

  width: 308px;
  height: 514px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 1;
`;

export const Name = styled(Typography)`
Width
Hug (86px)
Height
Hug (24px)
Robert Fox
Ag
Desktop/Heading
Font
SF Pro Text
Weight
600
Size
16px
Line height
24px
Text/Default
rgba(32, 34, 35, 1)
/* Name */


width: 86px;
height: 24px;

/* Desktop/Heading */

font-family: 'SF Pro Text';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 24px;
/* identical to box height, or 150% */


/* Text/Default */

color: #202223;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
`;

export const Title = styled(Typography)`
  /* Title */

  width: 124px;
  height: 16px;

  /* Desktop/Caption */

  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */

  /* Text/Subdued */

  color: #6d7175;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;
