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
- Move history feature

## Installation

Run the following command to install the most recent version of chess-engine-ts from NPM:

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

```

## User Interface

ChessEngineTS will only operate in the background of your program, using this API will make creating the user interface easier.

## API

### Constructor: Board( fen : `string` )

The Board() constructor takes an optional parameter which specifies the board
configuration in
[Forsyth-Edwards Notation (FEN)](https://www.chess.com/terms/fen-chess).

```ts
import { Board } from 'chess-engine-ts'

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
import { Board } from 'chess-engine-ts';

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

### .loadFen(fen : `string`)

loads Fen

```ts
import { Board } from 'chess-engine-ts';

const board = new Board();

board.loadFen('rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq - 0 1')

```

### .exportFen() : `string`

Returns the FEN of the current position

```ts
import { Board } from 'chess-engine-ts'

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
import { Board } from 'chess-engine-ts';

const board = new Board();

board.move('a2', 'a4');
```

### .validMoves(square : `Square`) : `Square`[]

Takes in one argument of type square, returns an array of valid moves of type `Square`(`a1` | `b1`, `c1` ... `f8` | `g8` | `h8`);

```ts
import { Board } from 'chess-engine-ts';

const board = new Board();

console.log(board.validMoves('a2'))

//->[ 'a3', 'a4' ]
```

### .isCheck() : `boolean`

returns if current color is in check

```ts
import { Board } from 'chess-engine-ts';

const board = new Board('3b1q1q/1N2PRQ1/rR3KBr/B4PP1/2Pk1r1b/1P2P1N1/2P2P2/8 b - -');

console.log(board.isCheck())

//-> true
```

### .isMate() : `boolean`

returns if current color has no legal moves and is in check

```ts
import { Board } from 'chess-engine-ts';

const board = new Board('3b1q1q/1N2PRQ1/rR3KBr/B4PP1/2Pk1r1b/1P2P1N1/2P2P2/8 b - -');

console.log(board.isMate())

//-> true
```

### .isStalemate() : `boolean`

returns if current color has no legal moves and is not in check

```ts
import { Board } from 'chess-engine-ts';

const board = new Board('8/6p1/5p2/5k1K/7P/8/8/8 w - - -');

console.log(board.isStalemate())

//-> true
```
