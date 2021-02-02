/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import * as colors from "../styles/colors";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import "@reach/accordion/styles.css";

//moment
import moment from "moment";

//hooks
import { useDateConverter } from "../utils/dateConverter";

//svg
import { ReactComponent as ClipSVG } from "../assets/icon_clip.svg";

//=================================================

function EmailRow({ email }) {
  const { isToday, isMonth } = useDateConverter();

  //formatteddate
  let formattedDate;
  if (isToday(email?.Date)) {
    formattedDate = moment(email?.Date).format("H:HH");
  } else if (isMonth(email?.Date)) {
    formattedDate = moment(email?.Date).format("MMM DD");
  } else {
    formattedDate = moment(email?.Date).format("YYYY/MM/DD");
  }

  //Foramatted 'To' - If email is sent to more than one person show '...' after first address and a number with recipient number.
  let formattedTo;
  let recipientCount;
  const reciever = email?.To;
  if (typeof reciever === "object") {
    recipientCount = reciever.length - 1;
    formattedTo = `${reciever[0]},  ...`;
  } else {
    recipientCount = null;
    formattedTo = reciever;
  }

  //main markup
  const accordianButtonMarkup = (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        width: "1400px",
        borderBottom: "2px black",
        "&:hover": {
          cursor: "pointer",
          color: "blue",
        },
      }}
    >
      <EmailMain>{email?.From}</EmailMain>
      <Wrapper>
        <EmailMain css={{ maxWidth: 250 }}>{formattedTo}</EmailMain>
        <ElementWrapper
          css={{ display: "flex", justifyContent: "center", width: "60px" }}
        >
          {recipientCount ? (
            <RecipientCountWrapper>{`+${recipientCount}`}</RecipientCountWrapper>
          ) : null}
        </ElementWrapper>
      </Wrapper>

      <Wrapper>
        <EmailMain css={{ maxWidth: 250 }}>{email?.Subject}</EmailMain>
        <ElementWrapper>
          {email?.Attachment ? <ClipSVG /> : null}
        </ElementWrapper>
      </Wrapper>
      <EmailMain>{formattedDate}</EmailMain>
    </div>
  );

  //body markup
  const accordianPanelMarkup = (
    <div css={{ display: "inline-flex", width: "1400px" }}>
      <div css={{ padding: "20px 20px" }}>{email?.Body}</div>
    </div>
  );

  return (
    <div>
      <Accordion collapsible multiple>
        <AccordionItem>
          {email?.From ? (
            <AccordionButton
              css={{
                padding: "0 0",
                background: "white",
                border: "none",
                borderBottom: `2px solid ${colors.gray}`,
              }}
            >
              <div>{accordianButtonMarkup}</div>
            </AccordionButton>
          ) : null}
          <AccordionPanel css={{ width: "1400px" }}>
            <div>{accordianPanelMarkup}</div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export { EmailRow };

//======================================================

const EmailMain = styled.div({
  padding: "20px 20px",
  justifySelf: "baseline",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: 300,
  whiteSpace: "nowrap",
  fontSize: "1.1rem",
});

const Wrapper = styled.div({
  display: "grid",
  gridTemplateColumns: "300px 50px",
});

const ElementWrapper = styled.div({
  width: "20px",
  margin: "auto auto",
});

const RecipientCountWrapper = styled.div({
  width: "30px",
  border: `1px solid ${colors.gray10}`,
  borderRadius: "5px",
  backgroundColor: "gray",
  color: "white",
  fontWeight: "700",
  fontSize: "1.1rem",
});
