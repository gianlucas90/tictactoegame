import './Cell.css';
import React from 'react';

const Cell = ({ value, id, onCellClick, winningIndexes }) => {
  return (
    <div onClick={(e) => onCellClick(e.target.id)} id={id} className="cell">
      <div
        // Highlight if winners
        style={winningIndexes.includes(id) ? { color: 'red' } : null}
        className="cell-value"
      >
        {value}
      </div>
    </div>
  );
};

export default Cell;
