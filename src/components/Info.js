import React from 'react';

const renderContent = (isPlayer1Turn, winner) => {
  if (!winner) {
    return isPlayer1Turn ? <h1>Player 1 turn</h1> : <h1>Player 2 turn</h1>;
  }
  if (winner === 'draw') return <h1>We have a draw!</h1>;
  return <h1>The winner is {winner}</h1>;
};

const Info = ({ isPlayer1Turn, winner }) => {
  return <div>{renderContent(isPlayer1Turn, winner)}</div>;
};

export default Info;
