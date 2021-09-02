import React from "react";
import Chip from '@material-ui/core/Chip';

const UnreadCounter = (props) => {

  const { counter } = props;

  return (
    <Chip color="primary" label={counter} />
  );
};

export default UnreadCounter;