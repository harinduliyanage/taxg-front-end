import { Activity, Audio, Gallery, Video } from "react-activity-feed";
import { sanitizeURL, smartRender } from "react-activity-feed/dist/utils";
import { FileIcon } from "react-file-utils";

import * as linkify from "linkifyjs";
import React, { useEffect, useState } from "react";
import _truncate from "lodash/truncate";
import { Card } from "react-bootstrap";
import ActivityHeader from "./ActivitiHeader";
import CustomFooter from "./CustomFooter";

type ClickCallback = (word: string) => void;
type Word = string | JSX.Element;
type CustomAnchorProps = {
  type: "mention" | "hashtag";
  value: string;
  word: string;
  clickCallback?: ClickCallback;
  parentClass?: string;
};
type WordArray = Array<Word | Word[] | WordArray>;
type WordArrayArray = Array<WordArray | Word | WordArrayArray>;

const CustomAnchor = ({
  type,
  word,
  parentClass,
  value,
  clickCallback = () => {},
}: CustomAnchorProps) => (
  <React.Fragment>
    {!word.startsWith(value) && word.slice(0, word.indexOf(value))}
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a
      onClick={() => clickCallback(value.substring(1))}
      className={`${parentClass}__${type}`}
    >
      {value}
    </a>
    {!word.endsWith(value) && word.slice(word.indexOf(value) + value.length)}
  </React.Fragment>
);

const renderWord = (
  word: string,
  key: string,
  parentClass?: string,
  onClickMention?: any,
  onClickHashtag?: any
): Word => {
  const [link] = linkify.find(word);
  if (!link) return word;

  const { type, value, href } = link;

  if (onClickMention && type === "mention") {
    return (
      <CustomAnchor
        key={key}
        type={type}
        value={value}
        word={word}
        clickCallback={onClickMention}
        parentClass={parentClass}
      />
    );
  }

  if (onClickHashtag && type === "hashtag") {
    return (
      <CustomAnchor
        key={key}
        type={type}
        value={value}
        word={word}
        clickCallback={onClickHashtag}
        parentClass={parentClass}
      />
    );
  }

  if (type === "email" || type === "url") {
    return (
      <a
        href={encodeURI(href)}
        className={`${parentClass}__link`}
        target="blank"
        data-testid="renderWord-hyperlink"
        rel="nofollow noreferrer noopener"
        key={key}
      >
        {type === "email"
          ? value
          : _truncate(value.replace(/(http(s?):\/\/)?(www\.)?/, ""), {
              length: 33,
            })}
      </a>
    );
  }

  return word;
};

const textRenderer = (
  text?: string,
  parentClass?: string,
  onClickMention?: any,
  onClickHashtag?: any
) => {
  if (!text) return <></>;

  let renderedText = text
    .split(/\r\n|\r|\n/) // first break on line
    .map((line, i) =>
      line
        .split(" ") // break for each word
        .map((word, j) =>
          renderWord(
            word,
            `item-${i}-${j}`,
            parentClass,
            onClickMention,
            onClickHashtag
          )
        )
        .reduce<WordArray>(
          (acc, elem) => (acc.length ? [acc, " ", elem] : [elem]),
          []
        )
    )
    .reduce<WordArrayArray>(
      (acc, elem) => (acc.length ? [acc, "\n", elem] : [elem]),
      []
    );

  return <>{renderedText}</>;
};

const ActivityContent = (p: any) => {
  const [readMore, setReadMore] = useState(true);
  const { props } = p;
  const { activity } = props;

  const {
    object,
    text = (typeof object === "string" ? object : "").trim(),
    attachments: { og = {}, images = [], files = [] } = {},
    verb,
    image,
  } = activity;

  useEffect(() => {
    if (text && text.length > 287) {
      setReadMore(false);
    }
  }, [text]);
  console.log(og);
  // console.log(Card);
  return (
    <div className="post-content-wrapper">
      {text && (
        <>
          <div className="text-content" data-expand={readMore ? true : false}>
            {textRenderer(
              text,
              "raf-activity",
              props.onClickMention,
              props.onClickHashtag
            )}
          </div>
          {readMore ? null : (
            <button
              className="btn btn-link read-more-link"
              onClick={() => {
                setReadMore(!readMore);
              }}
            >
              Continue reading
            </button>
          )}
        </>
      )}

      {og && (
        <div style={{ padding: "8px 16px" }}>
          {og.videos ? (
            <Video og={og} />
          ) : og.audios ? (
            <Audio og={og} />
          ) : og.type === "website" || og.type === "article"  ? (
            <>
              <div className="card article">
                <a
                  href={og.url}
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  className="card-url"
                >
                  <div className="card-image">
                    <img
                      src={og.images.length ? og.images[0]?.image : ""}
                      alt={og.title}
                    />
                  </div>
                  <div className="card-body">
                    <h5>{og.title}</h5>
                    <p>{og.description ? og.description : null}</p>
                    <span className="card__url">
                      {og.site_name ? og.site_name.toLowerCase() : ""}
                    </span>
                  </div>
                </a>
              </div>
            </>
          ) : (
            smartRender(Card, og)
          )}
        </div>
      )}

      {typeof image === "string" && (
        <div style={{ padding: "8px 0" }}>
          <Gallery images={[image]} />
        </div>
      )}

      {!!images.length && (
        <div style={{ padding: "8px 0" }}>
          <Gallery images={images} />
        </div>
      )}

      {!!files.length && (
        <ol className="raf-activity__attachments">
          {files.map(
            (
              pt: { name: string; url: string; mimeType: string },
              i: number
            ) => (
              <a href={sanitizeURL(pt.url)} download key={i}>
                <li className="raf-activity__file">
                  <FileIcon mimeType={pt.mimeType} filename={pt.name} />{" "}
                  {pt.name}
                </li>
              </a>
            )
          )}
        </ol>
      )}

      {verb === "repost" &&
        typeof object === "object" &&
        smartRender(renderActivity, {
          ...props,
          activity: object as any,
        })}
    </div>
  );
};

const renderActivity = (props: any) => {
  const { activity, feedGroup, userId } = props;

  return (
    <Activity
      Header={<ActivityHeader activity={activity} />}
      Content={<ActivityContent props={props} />}
      {...props}
      Footer={() => (
        <CustomFooter
          activity={activity}
          feedGroup={feedGroup}
          userId={userId}
        />
      )}
    />
  );
};

export default ActivityContent;
