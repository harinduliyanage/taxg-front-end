import axios from "axios";
import { useEffect, useState } from "react";
// import CateggeriesSeach from "../../components/organisms/categories_search";
import {
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "../../components/organisms/headings";
// import "./_DiscoverPage.scss";
// import "./_discover-v2.scss";

import "./knowledgeresults.scss";
import "./knowledgeresultsadd.scss";
import { DISCOVER_SEARCH_KEY } from "../../actions/keys";
// import { Col, Row, Card, Container } from "react-bootstrap";
import QuestionIconImage from "../../assets/images/question.png";
// import SearchImage from '../../assets/images/question.png';
import PersonIconImage from "../../assets/images/user.png";
import { useParams } from "react-router-dom";
import PageTemplate from "../templates/PageTemplate";
// import Paper from "@mui/material/Paper";
// import InputBase from "@mui/material/InputBase";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
// import { withTheme } from "@emotion/react";
import "./newKnowledgeGrid.scss";
import {
  // Box,
  Grid,
  Typography,
  Button,
  // Avatar,
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
  // SearchField,
  ProvidersHeading,
  // ViewQuestionCard,
  BottomCard,
  RateCard,
  // OutLinedButton,
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
import { ThumbsUp, ThumbsDown } from "react-feather";
import { People, Questions } from "./constants";
import ProgressBar from "./ProgressBar";

function KnowledgeResults() {
  const [moreAnswers, setMoreAnswers] = useState(null);

  const [suggestedAnswers, setSuggestedAnswers] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const [matchingServiceProviders, setMatchingServiceProviders] =
  useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState(id);

  useEffect(() => {
    searchDiscovers(id);
  }, [id]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigator(`/knowledge/services/keyword/${searchQuery}`);
  };

  const navigator = useNavigate();

  async function searchDiscovers(searchQuery) {
    const config = {
      "x-api-key": DISCOVER_SEARCH_KEY,
    };
    setIsLoading(true);
    setTimeout(async () => {
      await axios
        .get(
          `https://f5bf8zclzi.execute-api.us-east-1.amazonaws.com/dev/discover?searchKeyword="${searchQuery}"`,
          {
            headers: config,
          }
        )
        .then(async (res) => {
          setMoreAnswers(
            res.data.results.more_answers !== undefined &&
              Object.keys(res.data.results.more_answers).length === 0
              ? null
              : res.data.results.more_answers
          );

          setSuggestedAnswers(
            res.data.results.suggested_answer !== undefined &&
              Object.keys(res.data.results.suggested_answer).length === 0
              ? null
              : res.data.results.suggested_answer
          );
          setIsLoading(false);
          console.log("response data :", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 5000);
  }
  const [viewSources, setViewSources] = useState(false);
  // const SuggestedAnswers = (data) => {
  //   return (
  //     <div className="suggested__Answers">
  //       <HeadingH3
  //         text={suggestedAnswers.answerTitle}
  //         className="heading__cus2"
  //       />
  //       <Paragraph text={suggestedAnswers.answerDetail} />
  //       <div className="like__answer">
  //         {suggestedAnswers.answerURL !== "" && (
  //           <p style={{ marginBottom: 0 }}>
  //             {suggestedAnswers.answerURL && <>Source Link :</>}
  //             <a
  //               className="More__link"
  //               href={suggestedAnswers.answerURL}
  //               target="_blank"
  //               rel="noreferrer"
  //             >
  //               {suggestedAnswers.answerURL}
  //             </a>
  //           </p>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  // const MoreAnswers = (data) => {
  //   return (
  //     <div className="moreAnswers">
  //       <HeadingH3 text={data.data.answerTitle} className="heading__cus2" />
  //       <Paragraph text={data.data.answerDetail} />
  //       <div className="like__answer">
  //         {data.data.answerURL !== "" && (
  //           <p style={{ marginBottom: 0 }}>
  //             {data.data.answerURL && <>Source Link :</>}
  //             <a
  //               className="More__link"
  //               href={data.data.answerURL}
  //               target="_blank"
  //               rel="noreferrer"
  //             >
  //               {data.data.answerURL}
  //             </a>
  //           </p>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <PageTemplate>
      <main className="discovery-knowlege-search">
        <Grid
          container
          justifyContent="space-between"
          flexDirection={{ xs: "cloumn", md: "row" }}
          className="knowledge"
        >
          <Grid
            container
            item
            xs={12}
            md={8}
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
                  <QuestionIcon src={QuestionIconImage} sx={{ mr: 2 }} />
                  <Typography className="question">
                    {question.question}
                  </Typography>
                </QuestionCard>
                <AnswerCard1 flexDirection="column">
                  <Typography className="view-answer">
                    {question.answer}
                  </Typography>
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
                        sx={{ textTransform: "none" }}
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
                        sx={{ textTransform: "none" }}
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
                  src={QuestionIconImage}
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
            <NewQuestionCard>
              <Grid
                container
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="caption"
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: "16px",
                  }}
                >
                  14/20 questions used
                </Typography>
                <ProgressBar progress={60} height={30}></ProgressBar>
              </Grid>
            </NewQuestionCard>
          </Grid>

          <Grid container item xs={12} md={4} flexDirection="column">
            <SuggestedCard>
              <Content>
                <ProvidersHeading>Matching Service Providers</ProvidersHeading>
                <PeopleGrid>
                  {People?.map((person, index) => (
                    <Person key={person.id}>
                      <img
                        class="personImage"
                        src={PersonIconImage}
                        alt="person"
                      />
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
      </main>
    </PageTemplate>
  );
}

export default KnowledgeResults;
