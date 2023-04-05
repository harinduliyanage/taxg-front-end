/* eslint-disable no-unused-vars */
import { withTheme } from "@emotion/react";
import "../../../../index.css";
import { Box, Grid, Typography } from "@mui/material";
import {
  AnswerCard1,
  NewQuestionCard,
  QuestionCard,
  SuggestedCard,
  SuggestedCard2,
  ViewButton,
  PrimaryButton,
  SearchField,
} from "./style";
import { People, Questions } from "./constants";

/**
 * Parent Knowledge view component define here.
 * @param {*} param0
 * @returns
 */
const KnowledgeView = () => {
  //
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
            <QuestionCard>{question.question}</QuestionCard>
            <AnswerCard1>{question.answer}</AnswerCard1>
          </Grid>
        ))}
        <Grid
          container
          justifyContent="space-between"
          position="relative"
          alignItems="center"
          flexDirection="column"
        >
          <NewQuestionCard>
            <SearchField />
          </NewQuestionCard>
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={4}
        justifyContent="space-between"
        flexDirection="column"
      >
        <SuggestedCard>
          <Grid className="content">
            <Typography className="suggested">
              Matching service providers
            </Typography>
            <Grid className="people">
              {People?.map((person, index) => (
                <Grid className="person" key={person.id}>
                  <Box
                    component="img"
                    className="personImage"
                    src={person.image}
                  />
                  <Grid className="frame1">
                    <Typography className="name">{person.name}</Typography>
                    <Typography className="position">
                      {person.position}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <ViewButton>View All</ViewButton>
          </Grid>
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
