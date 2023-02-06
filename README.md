# ChessEngineTS

ChessEngineTS is my implementation of a bitboard chess engine written in typescript

## Features
- Move generation
- Load/Export FEN

## In development
- Search
- Evaluation 
- Load/Export PGN
- FEN validation

## Installation

Run the following command to install the most recent version of chess.js from NPM:

```sh
npm install chess-engine-ts
```
or using yarn 

```sh
yarn add chess-engine-ts
```

## Example Code

The code below creates a board with pieces at starting position

```ts
import { Board } from 'chess-engine-ts'

const board = new Board();

console.log(chess.exportFen());
```

## User Interface

ChessEngineTS will only operate in the background of your program, using this API will make creating the user interface easier.

## API

### Constructor: Board( fen : `string` )

The Board() constructor takes an optional parameter which specifies the board
configuration in
[Forsyth-Edwards Notation (FEN)](https://www.chess.com/terms/fen-chess).

```ts
// board defaults to the starting position when called with no parameters
const board = new Board()

// pass in a FEN string to load a particular position
const board = new Board(
  '2q5/K7/1P2r2n/Q2n2P1/2p3P1/p1Pp1k2/2R2B2/8 w - - 0 1'
)
```

### .overview()

Returns an array of elements consisting of piece data or empty squares(`undefined`)

```ts
const board = new Board()

console.log(chess.overview())

//->    [
//      {type: 'r', color: 'b', square: 'h8'},
//      {type: 'n', color: 'b', square: 'g8'},
//      {type: 'b', color: 'b', square: 'f8'},
//      {type: 'k', color: 'b', square: 'e8'},
//      {type: 'q', color: 'b', square: 'd8'},
//      {type: 'b', color: 'b', square: 'c8'},
//      {type: 'n', color: 'b', square: 'b8'},
//      {type: 'r', color: 'b', square: 'a8'},
//      undefined,
//      undefined,
//      undefined,
//      undefined,
//      undefined,
//      ...
//      {type: 'r', color: 'w', square: 'a1'},
//      {type: 'n', color: 'w', square: 'b1'},
//      {type: 'b', color: 'w', square: 'c1'},
//      {type: 'q', color: 'w', square: 'd1'},
//      {type: 'k', color: 'w', square: 'e1'},
//      {type: 'b', color: 'w', square: 'f1'},
//      {type: 'n', color: 'w', square: 'g1'},
//      {type: 'r', color: 'w', square: 'h1'}]
```

### .loadFen([`string`])

loads Fen

```ts
const board = new Board();

board.loadFen('rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq - 0 1')

```

### .exportFen()

Returns the FEN of the current position

```ts
const board = new Board();

board.move('a2', 'a4');

console.log(board.exportFen());

//-> rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq - 0 1
```

### .move(from : `Square`, to : `Square`) : `boolean`

Takes two arguments, both are of type `Square` (`a1` | `b1`, `c1` ... `f8` | `g8` | `h8`);
whichs moves the piece from->to

if move is valid it will return `true`, else `false`.

```ts
const board = new Board();

board.move('a2', 'a4');
```


