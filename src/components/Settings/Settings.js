import './Settings.css';
import React from 'react';
import Players from './Players';
import Symbol from './Symbol';

class Settings extends React.Component {
  state = { step: 1 };

  // Proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  // Go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  render() {
    const { step } = this.state;

    switch (step) {
      case 1:
        return (
          <Players
            nextStep={this.nextStep}
            onButtonPlayersClick={this.props.onButtonPlayersClick}
          />
        );
      case 2:
        return (
          <Symbol
            prevStep={this.prevStep}
            onButtonSymbolClick={this.props.onButtonSymbolClick}
            onConfirmation={this.props.onConfirmation}
            isMultiplayer={this.props.isMultiplayer}
          />
        );
      default:
        return null;
    }
  }
}

export default Settings;
