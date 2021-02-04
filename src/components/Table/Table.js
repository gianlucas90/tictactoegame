import './Table.css';
import React from 'react';
import Cell from './Cell';

const Table = ({ table, onCellClick, winningIndexes }) => {
  const tableRender = table.map((cell, i) => {
    return (
      <Cell
        key={i}
        id={i}
        value={cell}
        onCellClick={onCellClick}
        winningIndexes={winningIndexes}
      />
    );
  });

  return <div className="table">{tableRender}</div>;
};

export default Table;
