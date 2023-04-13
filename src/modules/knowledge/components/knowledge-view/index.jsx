/* eslint-disable no-unused-vars */
import { withTheme } from "@emotion/react";
import "../../../../index.css";
import {
  Box,
  Grid,
  Typography,
  Button,
  Avatar,
  TextField,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import {
  AnswerCard1,
  NewQuestionCard,
  QuestionCard,
  SuggestedCard,
  SuggestedCard2,
  ViewButton,
  PrimaryButton,
  SearchField,
  ProvidersHeading,
  ViewQuestionCard,
  BottomCard,
  RateCard,
  OutLinedButton,
  RateButton1,
  QuestionIcon,
  SourceCard,
  LinkText,
  PeopleGrid,
  Person,
  Frame1,
  Content,
  Name,
  Title,
} from "./style";
import { ThumbsUp, ThumbsDown, ArrowDown } from "react-feather";
import { People, Questions } from "./constants";
import { useState } from "react";

/**
 * Parent Knowledge view component define here.
 * @param {*} param0
 * @returns
 */
const KnowledgeView = () => {
  //
  const [viewSources, setViewSources] = useState(false);
  return (
    <Grid
      container
      justifyContent="space-between"
      flexDirection="row"
      className="knowledge"
    >
      <Grid
        container
        item
        xs={8}
        justifyContent="space-between"
        flexDirection="column"
      >
        {Questions.map((question, index) => (
          <Grid
            container
            justifyContent="space-between"
            position="relative"
            alignItems="center"
            flexDirection="column"
            key={index}
          >
            <QuestionCard>
              <QuestionIcon src="./question.png" sx={{ mr: 2 }} />
              <Typography className="question">{question.question}</Typography>
            </QuestionCard>
            <AnswerCard1 flexDirection="column">
              <Typography className="view-answer">{question.answer}</Typography>
              <BottomCard>
                <RateCard>
                  <RateButton1>
                    <ThumbsUp />
                  </RateButton1>
                  <RateButton1>
                    <ThumbsDown />
                  </RateButton1>
                </RateCard>
                {!viewSources && (
                  <Button
                    className="outlined-button"
                    variant="outlined"
                    startIcon={<ArrowDropDownIcon />}
                    onClick={() => setViewSources(true)}
                  >
                    View Resources
                  </Button>
                )}
                {viewSources && (
                  <Button
                    className="outlined-button"
                    variant="outlined"
                    startIcon={<KeyboardArrowUpOutlinedIcon />}
                    onClick={() => setViewSources(false)}
                  >
                    Hide Resources
                  </Button>
                )}
              </BottomCard>
              {viewSources && (
                <SourceCard>
                  <LinkText>
                    https://s3.u.west-2.amazonaws.com/taxglobal-kendra/w-Elben.tsv
                  </LinkText>
                  <LinkText>
                    https://s3.u.west-2.amazonaws.com/taxglobal-kendra/w-Elben.tsv
                  </LinkText>
                  <LinkText>
                    https://s3.u.west-2.amazonaws.com/taxglobal-kendra/w-Elben.tsv
                  </LinkText>
                </SourceCard>
              )}
            </AnswerCard1>
          </Grid>
        ))}

        <NewQuestionCard>
          <Grid
            className="search-field"
            container
            flexDirection="row"
            alignItems="center"
          >
            <QuestionIcon
              src="./question.png"
              sx={{ mr: 2 }}
              className="search-icon"
            />
            <TextField
              className="search-placeholder"
              placeholder="Ask follow up question"
            />
            <Grid className="background-focus" />
          </Grid>
          <ViewButton>Clear Conversation</ViewButton>
        </NewQuestionCard>
      </Grid>

      <Grid container item xs={4} flexDirection="column">
        <SuggestedCard>
          <Content>
            <ProvidersHeading sx={{ fontFamily: "SF Pro Text" }}>
              Matching Service Providers
            </ProvidersHeading>
            <PeopleGrid>
              {People?.map((person, index) => (
                <Person key={person.id}>
                  <img class="personImage" src={person.image} alt="person" />
                  <Frame1>
                    <Name>{person.name}</Name>
                    <Title>{person.position}</Title>
                  </Frame1>
                </Person>
              ))}
            </PeopleGrid>
            <ViewButton>View All</ViewButton>
          </Content>
        </SuggestedCard>
        <SuggestedCard2>
          <Grid className="content2">
            <Grid className="copy">
              <Typography className="text1" fontWeight={600}>
                Get unlimited access
              </Typography>
              <Typography className="text2">
                First 20 questions are free! To continue using the service
                subscribe at just $4.99/month.
              </Typography>
            </Grid>
            <PrimaryButton>Subscribe</PrimaryButton>
          </Grid>
        </SuggestedCard2>
      </Grid>
    </Grid>
  );
};
//
export default withTheme(KnowledgeView);
