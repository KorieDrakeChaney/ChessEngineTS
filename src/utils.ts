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

export const AFILE = 0b0000000100000001000000010000000100000001000000010000000100000001n;
export const BFILE = 0b0000001000000010000000100000001000000010000000100000001000000010n;
export const CFILE = 0b0000010000000100000001000000010000000100000001000000010000000100n;
export const DFILE = 0b0000100000001000000010000000100000001000000010000000100000001000n;
export const EFILE = 0b0001000000010000000100000001000000010000000100000001000000010000n;
export const FFILE = 0b0010000000100000001000000010000000100000001000000010000000100000n;
export const GFILE = 0b0100000001000000010000000100000001000000010000000100000001000000n;
export const HFILE = 0b1000000010000000100000001000000010000000100000001000000010000000n;

export type CastlingType = 'k' | 'q';

export const wkCastlingMask: bigint = 0b0000000000000000000000000000000000000000000000000000000001100000n;
export const wqCastlingMask: bigint = 0b0000000000000000000000000000000000000000000000000000000000001100n;
export const bkCastlingMask: bigint = 0b0110000000000000000000000000000000000000000000000000000000000000n;
export const bqCastlingMask: bigint = 0b0000110000000000000000000000000000000000000000000000000000000000n;

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
  start: number;
  dest: number;
  promote: number;
};

export type PieceData = Piece & { square: Square };

export type History = Move[];
export type MoveList = Record<Square, number[]>;
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
  a1: 0 + 8 * 0,
  b1: 1 + 8 * 0,
  c1: 2 + 8 * 0,
  d1: 3 + 8 * 0,
  e1: 4 + 8 * 0,
  f1: 5 + 8 * 0,
  g1: 6 + 8 * 0,
  h1: 7 + 8 * 0,
  a2: 0 + 8 * 1,
  b2: 1 + 8 * 1,
  c2: 2 + 8 * 1,
  d2: 3 + 8 * 1,
  e2: 4 + 8 * 1,
  f2: 5 + 8 * 1,
  g2: 6 + 8 * 1,
  h2: 7 + 8 * 1,
  a3: 0 + 8 * 2,
  b3: 1 + 8 * 2,
  c3: 2 + 8 * 2,
  d3: 3 + 8 * 2,
  e3: 4 + 8 * 2,
  f3: 5 + 8 * 2,
  g3: 6 + 8 * 2,
  h3: 7 + 8 * 2,
  a4: 0 + 8 * 3,
  b4: 1 + 8 * 3,
  c4: 2 + 8 * 3,
  d4: 3 + 8 * 3,
  e4: 4 + 8 * 3,
  f4: 5 + 8 * 3,
  g4: 6 + 8 * 3,
  h4: 7 + 8 * 3,
  a5: 0 + 8 * 4,
  b5: 1 + 8 * 4,
  c5: 2 + 8 * 4,
  d5: 3 + 8 * 4,
  e5: 4 + 8 * 4,
  f5: 5 + 8 * 4,
  g5: 6 + 8 * 4,
  h5: 7 + 8 * 4,
  a6: 0 + 8 * 5,
  b6: 1 + 8 * 5,
  c6: 2 + 8 * 5,
  d6: 3 + 8 * 5,
  e6: 4 + 8 * 5,
  f6: 5 + 8 * 5,
  g6: 6 + 8 * 5,
  h6: 7 + 8 * 5,
  a7: 0 + 8 * 6,
  b7: 1 + 8 * 6,
  c7: 2 + 8 * 6,
  d7: 3 + 8 * 6,
  e7: 4 + 8 * 6,
  f7: 5 + 8 * 6,
  g7: 6 + 8 * 6,
  h7: 7 + 8 * 6,
  a8: 0 + 8 * 7,
  b8: 1 + 8 * 7,
  c8: 2 + 8 * 7,
  d8: 3 + 8 * 7,
  e8: 4 + 8 * 7,
  f8: 5 + 8 * 7,
  g8: 6 + 8 * 7,
  h8: 7 + 8 * 7,
};

export const SquarePosition: Record<Square, [number, number]> = {
  a1: [7, 0],
  b1: [7, 1],
  c1: [7, 2],
  d1: [7, 3],
  e1: [7, 4],
  f1: [7, 5],
  g1: [7, 6],
  h1: [7, 7],
  a2: [6, 0],
  b2: [6, 1],
  c2: [6, 2],
  d2: [6, 3],
  e2: [6, 4],
  f2: [6, 5],
  g2: [6, 6],
  h2: [6, 7],
  a3: [5, 0],
  b3: [5, 1],
  c3: [5, 2],
  d3: [5, 3],
  e3: [5, 4],
  f3: [5, 5],
  g3: [5, 6],
  h3: [5, 7],
  a4: [4, 0],
  b4: [4, 1],
  c4: [4, 2],
  d4: [4, 3],
  e4: [4, 4],
  f4: [4, 5],
  g4: [4, 6],
  h4: [4, 7],
  a5: [3, 0],
  b5: [3, 1],
  c5: [3, 2],
  d5: [3, 3],
  e5: [3, 4],
  f5: [3, 5],
  g5: [3, 6],
  h5: [3, 7],
  a6: [2, 0],
  b6: [2, 1],
  c6: [2, 2],
  d6: [2, 3],
  e6: [2, 4],
  f6: [2, 5],
  g6: [2, 6],
  h6: [2, 7],
  a7: [1, 0],
  b7: [1, 1],
  c7: [1, 2],
  d7: [1, 3],
  e7: [1, 4],
  f7: [1, 5],
  g7: [1, 6],
  h7: [1, 7],
  a8: [0, 0],
  b8: [0, 1],
  c8: [0, 2],
  d8: [0, 3],
  e8: [0, 4],
  f8: [0, 5],
  g8: [0, 6],
  h8: [0, 7],
};

export const SQUARES: Square[] = [
  'a1',
  'b1',
  'c1',
  'd1',
  'e1',
  'f1',
  'g1',
  'h1',
  'a2',
  'b2',
  'c2',
  'd2',
  'e2',
  'f2',
  'g2',
  'h2',
  'a3',
  'b3',
  'c3',
  'd3',
  'e3',
  'f3',
  'g3',
  'h3',
  'a4',
  'b4',
  'c4',
  'd4',
  'e4',
  'f4',
  'g4',
  'h4',
  'a5',
  'b5',
  'c5',
  'd5',
  'e5',
  'f5',
  'g5',
  'h5',
  'a6',
  'b6',
  'c6',
  'd6',
  'e6',
  'f6',
  'g6',
  'h6',
  'a7',
  'b7',
  'c7',
  'd7',
  'e7',
  'f7',
  'g7',
  'h7',
  'a8',
  'b8',
  'c8',
  'd8',
  'e8',
  'f8',
  'g8',
  'h8',
];

export const StartFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
