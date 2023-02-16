/*
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
*/

export const FIRSTRANK = 0b0000000000000000000000000000000000000000000000000000000011111111n;
export const SECONDRANK = 0b0000000000000000000000000000000000000000000000001111111100000000n;
export const THIRDRANK = 0b0000000000000000000000000000000000000000111111110000000000000000n;
export const FOURTHRANK = 0b0000000000000000000000000000000011111111000000000000000000000000n;
export const FIFTHRANK = 0b0000000000000000000000001111111100000000000000000000000000000000n;
export const SIXTHRANK = 0b0000000000000000111111110000000000000000000000000000000000000000n;
export const SEVENTHRANK = 0b0000000011111111000000000000000000000000000000000000000000000000n;
export const EIGHTHRANK = 0b1111111100000000000000000000000000000000000000000000000000000000n;

export const HFILE = 0b0000000100000001000000010000000100000001000000010000000100000001n;
export const GFILE = 0b0000001000000010000000100000001000000010000000100000001000000010n;
export const FFILE = 0b0000010000000100000001000000010000000100000001000000010000000100n;
export const EFILE = 0b0000100000001000000010000000100000001000000010000000100000001000n;
export const DFILE = 0b0001000000010000000100000001000000010000000100000001000000010000n;
export const CFILE = 0b0010000000100000001000000010000000100000001000000010000000100000n;
export const BFILE = 0b0100000001000000010000000100000001000000010000000100000001000000n;
export const AFILE = 0b1000000010000000100000001000000010000000100000001000000010000000n;

export type CastlingType = 'k' | 'q';

export const wkCastlingMask: bigint = 0b0000000000000000000000000000000000000000000000000000000000000110n;
export const wqCastlingMask: bigint = 0b0000000000000000000000000000000000000000000000000000000000110000n;
export const bkCastlingMask: bigint = 0b0000011000000000000000000000000000000000000000000000000000000000n;
export const bqCastlingMask: bigint = 0b0011000000000000000000000000000000000000000000000000000000000000n;

export const fullBoardMask: bigint = 0b11111111111111111111111111111111111111111111111111111111n;

export const WHITE = 'w';
export const BLACK = 'b';

export type Color = 'w' | 'b';
export type PieceSymbol = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

export type Piece = {
  color: Color;
  type: PieceSymbol;
};

export type Move = {
  from: Square;
  to: Square;
};

export type PieceData = Piece & { square: Square };

export type MoveAttackData = {
  moves: bigint;
  attacks: bigint;
};

export type History = Move[];
export type Square =
  | 'a1'
  | 'b1'
  | 'c1'
  | 'd1'
  | 'e1'
  | 'f1'
  | 'g1'
  | 'h1'
  | 'a2'
  | 'b2'
  | 'c2'
  | 'd2'
  | 'e2'
  | 'f2'
  | 'g2'
  | 'h2'
  | 'a3'
  | 'b3'
  | 'c3'
  | 'd3'
  | 'e3'
  | 'f3'
  | 'g3'
  | 'h3'
  | 'a4'
  | 'b4'
  | 'c4'
  | 'd4'
  | 'e4'
  | 'f4'
  | 'g4'
  | 'h4'
  | 'a5'
  | 'b5'
  | 'c5'
  | 'd5'
  | 'e5'
  | 'f5'
  | 'g5'
  | 'h5'
  | 'a6'
  | 'b6'
  | 'c6'
  | 'd6'
  | 'e6'
  | 'f6'
  | 'g6'
  | 'h6'
  | 'a7'
  | 'b7'
  | 'c7'
  | 'd7'
  | 'e7'
  | 'f7'
  | 'g7'
  | 'h7'
  | 'a8'
  | 'b8'
  | 'c8'
  | 'd8'
  | 'e8'
  | 'f8'
  | 'g8'
  | 'h8';

export const SquareIndex: Record<Square, number> = {
  a1: 7 + 8 * 0,
  b1: 6 + 8 * 0,
  c1: 5 + 8 * 0,
  d1: 4 + 8 * 0,
  e1: 3 + 8 * 0,
  f1: 2 + 8 * 0,
  g1: 1 + 8 * 0,
  h1: 0 + 8 * 0,

  a2: 7 + 8 * 1,
  b2: 6 + 8 * 1,
  c2: 5 + 8 * 1,
  d2: 4 + 8 * 1,
  e2: 3 + 8 * 1,
  f2: 2 + 8 * 1,
  g2: 1 + 8 * 1,
  h2: 0 + 8 * 1,

  a3: 7 + 8 * 2,
  b3: 6 + 8 * 2,
  c3: 5 + 8 * 2,
  d3: 4 + 8 * 2,
  e3: 3 + 8 * 2,
  f3: 2 + 8 * 2,
  g3: 1 + 8 * 2,
  h3: 0 + 8 * 2,

  a4: 7 + 8 * 3,
  b4: 6 + 8 * 3,
  c4: 5 + 8 * 3,
  d4: 4 + 8 * 3,
  e4: 3 + 8 * 3,
  f4: 2 + 8 * 3,
  g4: 1 + 8 * 3,
  h4: 0 + 8 * 3,

  a5: 7 + 8 * 4,
  b5: 6 + 8 * 4,
  c5: 5 + 8 * 4,
  d5: 4 + 8 * 4,
  e5: 3 + 8 * 4,
  f5: 2 + 8 * 4,
  g5: 1 + 8 * 4,
  h5: 0 + 8 * 4,

  a6: 7 + 8 * 5,
  b6: 6 + 8 * 5,
  c6: 5 + 8 * 5,
  d6: 4 + 8 * 5,
  e6: 3 + 8 * 5,
  f6: 2 + 8 * 5,
  g6: 1 + 8 * 5,
  h6: 0 + 8 * 5,

  a7: 7 + 8 * 6,
  b7: 6 + 8 * 6,
  c7: 5 + 8 * 6,
  d7: 4 + 8 * 6,
  e7: 3 + 8 * 6,
  f7: 2 + 8 * 6,
  g7: 1 + 8 * 6,
  h7: 0 + 8 * 6,

  a8: 7 + 8 * 7,
  b8: 6 + 8 * 7,
  c8: 5 + 8 * 7,
  d8: 4 + 8 * 7,
  e8: 3 + 8 * 7,
  f8: 2 + 8 * 7,
  g8: 1 + 8 * 7,
  h8: 0 + 8 * 7,
};

export const SquarePosition: Record<Square, [number, number]> = {
  a1: [7, 0],
  b1: [6, 0],
  c1: [5, 0],
  d1: [4, 0],
  e1: [3, 0],
  f1: [2, 0],
  g1: [1, 0],
  h1: [0, 0],
  a2: [7, 1],
  b2: [6, 1],
  c2: [5, 1],
  d2: [4, 1],
  e2: [3, 1],
  f2: [2, 1],
  g2: [1, 1],
  h2: [0, 1],
  a3: [7, 2],
  b3: [6, 2],
  c3: [5, 2],
  d3: [4, 2],
  e3: [3, 2],
  f3: [2, 2],
  g3: [1, 2],
  h3: [0, 2],
  a4: [7, 3],
  b4: [6, 3],
  c4: [5, 3],
  d4: [4, 3],
  e4: [3, 3],
  f4: [2, 3],
  g4: [1, 3],
  h4: [0, 3],
  a5: [7, 4],
  b5: [6, 4],
  c5: [5, 4],
  d5: [4, 4],
  e5: [3, 4],
  f5: [2, 4],
  g5: [1, 4],
  h5: [0, 4],
  a6: [7, 5],
  b6: [6, 5],
  c6: [5, 5],
  d6: [4, 5],
  e6: [3, 5],
  f6: [2, 5],
  g6: [1, 5],
  h6: [0, 5],
  a7: [7, 6],
  b7: [6, 6],
  c7: [5, 6],
  d7: [4, 6],
  e7: [3, 6],
  f7: [2, 6],
  g7: [1, 6],
  h7: [0, 6],
  a8: [7, 7],
  b8: [6, 7],
  c8: [5, 7],
  d8: [4, 7],
  e8: [3, 7],
  f8: [2, 7],
  g8: [1, 7],
  h8: [0, 7],
};

export const SQUARES: Square[] = [
  'h1',
  'g1',
  'f1',
  'e1',
  'd1',
  'c1',
  'b1',
  'a1',

  'h2',
  'g2',
  'f2',
  'e2',
  'd2',
  'c2',
  'b2',
  'a2',

  'h3',
  'g3',
  'f3',
  'e3',
  'd3',
  'c3',
  'b3',
  'a3',

  'h4',
  'g4',
  'f4',
  'e4',
  'd4',
  'c4',
  'b4',
  'a4',

  'h5',
  'g5',
  'f5',
  'e5',
  'd5',
  'c5',
  'b5',
  'a5',

  'h6',
  'g6',
  'f6',
  'e6',
  'd6',
  'c6',
  'b6',
  'a6',

  'h7',
  'g7',
  'f7',
  'e7',
  'd7',
  'c7',
  'b7',
  'a7',

  'h8',
  'g8',
  'f8',
  'e8',
  'd8',
  'c8',
  'b8',
  'a8',
];

/**
 *
 * Returns an array of the squares that represent a bigint
 *
 * @example
 * ```ts
 * import {toSquares, HFILE} from 'chess-engine-ts';
 *
 * console.log(toSquares(HFILE));
 *
 * // -> [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8']
 *
 * ```
 * @param board = bigint
 * @returns Square[]
 */

export const toSquares = (board: bigint): Square[] => {
  const squares: Square[] = [];
  let bit: bigint = 1n;
  for (let i = 0; i < 64; i++) {
    if ((board & bit) !== 0n) {
      squares.push(SQUARES[i]);
    }
    bit = bit << 1n;
  }
  return squares;
};

export const StartFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
