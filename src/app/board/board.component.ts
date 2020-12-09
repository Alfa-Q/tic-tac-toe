import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  squares: Array<'X' | 'O' | null> = [];
  currentTurn: 'X' | 'O' = this.randomFirstTurn();
  winner: 'X' | 'O' | 'TIE' | null = null;
  moveCount: number = 0;

  constructor() {}

  ngOnInit(): void {}

  /**
   * Set initial state for a new game.
   */
  public newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.currentTurn = this.randomFirstTurn();
    this.moveCount = 0;
  }

  /**
   * Randomly select the player for the first turn.
   */
  private randomFirstTurn(): 'X' | 'O' {
    const playerCount = 2;
    const randomIndex = Math.floor(Math.random() * playerCount);
    return randomIndex == 0 ? 'X' : 'O';
  }

  /**
   * Update turn to the other player.
   */
  private updateTurn(): void {
    this.currentTurn = this.currentTurn == 'X' ? 'O' : 'X';
  }

  /**
   * Make a move
   * @param index
   */
  public makeMove(index: number) {
    // No move has been made for the square selected
    if (!this.squares[index]) {
      this.squares[index] = this.currentTurn;
      this.updateTurn();
      this.moveCount++;
    }
    this.winner = this.calculateWinner();
  }

  /**
   * Determine the winner of the game using an algorithm provided by React.
   */
  private calculateWinner(): 'X' | 'O' | 'TIE' | null {
    // Possible lines that results in a win
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check for winner
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }

    // Check for tie (all moves made and no winner)
    if (this.moveCount == 9) {
      return 'TIE';
    }

    // No tie and not all moves exhausted
    return null;
  }
}
