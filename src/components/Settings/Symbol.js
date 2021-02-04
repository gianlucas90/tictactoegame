import React from 'react';
import Button from '../Button';

const Symbol = (props) => {
  const onSelection = (e) => {
    props.onButtonSymbolClick(e.target.value);
    props.onConfirmation();
  };

  return (
    <div className="settings-container">
      <h2>
        {props.isMultiplayer
          ? 'Player one, Which symbol do you choose?'
          : 'Which symbol do you choose?'}
      </h2>
      <Button text={'X'} onClick={(e) => onSelection(e)} value={'X'} />
      <Button text={'O'} onClick={(e) => onSelection(e)} value={'O'} />
      <Button text={'Go Back'} onClick={props.prevStep} class={'back'} />
    </div>
  );
};

export default Symbol;
