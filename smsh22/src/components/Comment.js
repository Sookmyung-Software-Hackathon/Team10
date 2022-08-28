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
  margin: 3rem 0;
`;
export default Comment;
