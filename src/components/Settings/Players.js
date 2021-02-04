import './Players.css';
import React from 'react';
import Button from '../Button';

const Players = (props) => {
  const onSelection = (e) => {
    props.onButtonPlayersClick(e.target.value);
    props.nextStep();
  };

  return (
    <div className="settings-container">
      <h2>How many players?</h2>
      <Button text={'1player'} onClick={(e) => onSelection(e)} value={false} />
      <Button text={'2player'} onClick={(e) => onSelection(e)} value={true} />
    </div>
  );
};

export default Players;
