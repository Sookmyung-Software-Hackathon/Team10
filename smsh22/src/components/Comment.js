import React from "react";
import styled from "styled-components";

const Comment = ({ commentObj }) => {
  return (
    <>
      <Div>{commentObj.text}</Div>
    </>
  );
};
const Div = styled.div`
  margin: 1rem 4rem;
  padding: 1rem 2rem;
  font-size: 4rem;
`;
export default Comment;
