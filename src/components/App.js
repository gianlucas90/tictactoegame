import './App.css';
import React from 'react';
import TicTacToe from 'tictactoe-ai';
import Table from './Table/Table';
import Settings from './Settings/Settings';
import Info from './Info';
import Button from './Button';

const replaceValueOnTable = (table, index, symbol) => {
  // Make a shallow copy of the table
  let tableCopy = [...table];
  // Make a shallow copy of the item you want to mutate
  let cell = { ...tableCopy[index] };
  // Check if cell is empty
  if (Object.keys(cell).length === 0) {
    // 3. Replace the property you're intested in
    cell = symbol;
    // 4. Put it back into our array.
    tableCopy[index] = cell;
  }
  return tableCopy;
};

class App extends React.Component {
  state = {
    table: ['', '', '', '', '', '', '', '', ''],
    isMultiplayer: false,
    isPlayer1Turn: true,
    isPlayer2Turn: false,
    symbolPlayer1: 'X',
    symbolPlayer2: 'O',
    gameOn: false,
    winner: '',
    winningIndexes: [],
  };

  ///// Settings //////
  // Handle players change
  onButtonPlayersClick = (value) => {
    this.setState({ isMultiplayer: value === 'true' ? true : false });
  };

  // Handle Symbol change
  onButtonSymbolClick = (value) => {
    this.setState({
      symbolPlayer1: value,
      symbolPlayer2: value === 'X' ? 'O' : 'X',
    });
  };

  // Handle confirmation
  onConfirmation = () => {
    this.setState({ gameOn: true });
  };

  ////// Table ///////
  onCellClick = (index) => {
    const {
      table,
      isMultiplayer,
      isPlayer1Turn,
      isPlayer2Turn,
      symbolPlayer1,
      symbolPlayer2,
    } = this.state;

    // Multiplayer Game
    if (isMultiplayer) {
      if (isPlayer1Turn) {
        const newTable = replaceValueOnTable(table, index, symbolPlayer1);
        this.setState({
          table: newTable,
          isPlayer1Turn: false,
          isPlayer2Turn: true,
        });
      }
      if (isPlayer2Turn) {
        const newTable = replaceValueOnTable(table, index, symbolPlayer2);
        this.setState({
          table: newTable,
          isPlayer1Turn: true,
          isPlayer2Turn: false,
        });
      }
    } else {
      // Single player mode
      if (isPlayer1Turn) {
        const newTable = replaceValueOnTable(table, index, symbolPlayer1);
        this.setState({ table: newTable, isPlayer1Turn: false });
      }
    }
  };

  // Helpers functions
  renderTable() {
    if (this.state.gameOn)
      return (
        <div className="container">
          <Info
            isPlayer1Turn={this.state.isPlayer1Turn}
            winner={this.state.winner}
          />
          <Table
            table={this.state.table}
            onCellClick={this.onCellClick}
            winningIndexes={this.state.winningIndexes}
          />
          {/* Reset Game when done */}
          {this.state.winner ? (
            <div>
              <Button
                text={'Restart'}
                onClick={() =>
                  this.setState({
                    table: ['', '', '', '', '', '', '', '', ''],
                    isPlayer1Turn: true,
                    isPlayer2Turn: false,
                    winningIndexes: [],
                    winner: '',
                  })
                }
                class={'restart'}
              />
            </div>
          ) : null}
        </div>
      );
    return (
      <div className="container">
        <Settings
          isMultiplayer={this.state.isMultiplayer}
          onButtonPlayersClick={this.onButtonPlayersClick}
          onButtonSymbolClick={this.onButtonSymbolClick}
          onConfirmation={this.onConfirmation}
        />
      </div>
    );
  }

  // Lifecycle methods
  componentDidUpdate() {
    // AI turn
    if (
      !this.state.isPlayer1Turn &&
      !this.state.isMultiplayer &&
      !this.state.winner
    ) {
      var board = new TicTacToe.TicTacToeBoard(this.state.table);
      var aiTeam = board.oppositePlayer(this.state.symbolPlayer1);
      var aiPlayer = new TicTacToe.TicTacToeAIPlayer();
      aiPlayer.initialize(aiTeam, board);
      var move = aiPlayer.makeMove();
      if (move != null) {
        // setTimeout(board.makeMove(aiTeam, move), 1500);
        board.makeMove(aiTeam, move);
      }
      if (board.winner() === null) {
        setTimeout(() => {
          this.setState({
            table: board.board,
            isPlayer1Turn: true,
          });
        }, 1500);

        // this.setState({ table: board.board, isPlayer1Turn: true });
      } else {
        const winner = board.winner().cell;
        const indexes = board.winner().indexes;

        if (indexes === null) this.setState({ winner: 'draw' });

        if (winner === this.state.symbolPlayer1)
          this.setState({
            table: board.board,
            winner: 'player1',
            winningIndexes: indexes,
          });

        if (winner === this.state.symbolPlayer2)
          this.setState({
            table: board.board,
            winner: 'player2',
            winningIndexes: indexes,
          });
      }
    }

    // To Solve multiplayer
    if (
      this.state.isMultiplayer &&
      this.state.gameOn &&
      this.state.winner === ''
    ) {
      var board = new TicTacToe.TicTacToeBoard(this.state.table);
      if (board.winner() !== null) {
        const winner = board.winner().cell;
        const indexes = board.winner().indexes;

        if (indexes === null) this.setState({ winner: 'draw' });

        if (winner === this.state.symbolPlayer1)
          this.setState({ winner: 'player1', winningIndexes: indexes });

        if (winner === this.state.symbolPlayer2)
          this.setState({ winner: 'player2', winningIndexes: indexes });
      }
    }
  }

  render() {
    return <div className="app">{this.renderTable()}</div>;
  }
}

export default App;
