import { PieceType, Square } from './types';

export const RANK_1: bigint = 0b0000000000000000000000000000000000000000000000000000000011111111n;
export const RANK_2: bigint = 0b0000000000000000000000000000000000000000000000001111111100000000n;
export const RANK_3: bigint = 0b0000000000000000000000000000000000000000111111110000000000000000n;
export const RANK_4: bigint = 0b0000000000000000000000000000000011111111000000000000000000000000n;
export const RANK_5: bigint = 0b0000000000000000000000001111111100000000000000000000000000000000n;
export const RANK_6: bigint = 0b0000000000000000111111110000000000000000000000000000000000000000n;
export const RANK_7: bigint = 0b0000000011111111000000000000000000000000000000000000000000000000n;
export const RANK_8: bigint = 0b1111111100000000000000000000000000000000000000000000000000000000n;

export const FILE_A: bigint = 0b0000000100000001000000010000000100000001000000010000000100000001n;
export const FILE_B: bigint = 0b0000001000000010000000100000001000000010000000100000001000000010n;
export const FILE_C: bigint = 0b0000010000000100000001000000010000000100000001000000010000000100n;
export const FILE_D: bigint = 0b0000100000001000000010000000100000001000000010000000100000001000n;
export const FILE_E: bigint = 0b0001000000010000000100000001000000010000000100000001000000010000n;
export const FILE_F: bigint = 0b0010000000100000001000000010000000100000001000000010000000100000n;
export const FILE_G: bigint = 0b0100000001000000010000000100000001000000010000000100000001000000n;
export const FILE_H: bigint = 0b1000000010000000100000001000000010000000100000001000000010000000n;

export const WHITE_KING_SIDE_CASTLE: bigint = 0b0000000000000000000000000000000000000000000000000000000001100000n;
export const WHITE_QUEEN_SIDE_CASTLE: bigint = 0b0000000000000000000000000000000000000000000000000000000000001100n;
export const BLACK_KING_SIDE_CASTLE: bigint = 0b0110000000000000000000000000000000000000000000000000000000000000n;
export const BLACK_QUEEN_SIDE_CASTLE: bigint = 0b0000110000000000000000000000000000000000000000000000000000000000n;

export const BLACK_KING_SIDE_CASTLE_SQUARE: bigint =
  0b0100000000000000000000000000000000000000000000000000000000000000n;
export const BLACK_QUEEN_SIDE_CASTLE_SQUARE: bigint =
  0b0000010000000000000000000000000000000000000000000000000000000000n;

export const WHITE_KING_SIDE_CASTLE_SQUARE: bigint =
  0b0000000000000000000000000000000000000000000000000000000001000000n;

export const WHITE_QUEEN_SIDE_CASTLE_SQUARE: bigint =
  0b0000000000000000000000000000000000000000000000000000000000000100n;

export enum Piece {
  PAWN = 0,
  BISHOP = 1,
  KNIGHT = 2,
  ROOK = 3,
  QUEEN = 4,
  KING = 5,
}

export const PieceIndex: Record<PieceType, number> = {
  p: 0,
  b: 1,
  n: 2,
  r: 3,
  q: 4,
  k: 5,
};

export const PieceTypeIndex: Record<Piece, PieceType> = {
  0: 'p',
  1: 'b',
  2: 'n',
  3: 'r',
  4: 'q',
  5: 'k',
};

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

export const getSquaresFromBigInt = (board: bigint): Square[] => {
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

export const getSquareFromBigInt = (board: bigint): Square | undefined => {
  switch (board) {
    case 0b0000000000000000000000000000000000000000000000000000000000000001n:
      return 'a1';
    case 0b0000000000000000000000000000000000000000000000000000000000000010n:
      return 'b1';
    case 0b0000000000000000000000000000000000000000000000000000000000000100n:
      return 'c1';
    case 0b0000000000000000000000000000000000000000000000000000000000001000n:
      return 'd1';
    case 0b0000000000000000000000000000000000000000000000000000000000010000n:
      return 'e1';
    case 0b0000000000000000000000000000000000000000000000000000000000100000n:
      return 'f1';
    case 0b0000000000000000000000000000000000000000000000000000000001000000n:
      return 'g1';
    case 0b0000000000000000000000000000000000000000000000000000000010000000n:
      return 'h1';
    case 0b0000000000000000000000000000000000000000000000000000000100000000n:
      return 'a2';
    case 0b0000000000000000000000000000000000000000000000000000001000000000n:
      return 'b2';
    case 0b0000000000000000000000000000000000000000000000000000010000000000n:
      return 'c2';
    case 0b0000000000000000000000000000000000000000000000000000100000000000n:
      return 'd2';
    case 0b0000000000000000000000000000000000000000000000000001000000000000n:
      return 'e2';
    case 0b0000000000000000000000000000000000000000000000000010000000000000n:
      return 'f2';
    case 0b0000000000000000000000000000000000000000000000000100000000000000n:
      return 'g2';
    case 0b0000000000000000000000000000000000000000000000001000000000000000n:
      return 'h2';
    case 0b0000000000000000000000000000000000000000000000010000000000000000n:
      return 'a3';
    case 0b0000000000000000000000000000000000000000000000100000000000000000n:
      return 'b3';
    case 0b0000000000000000000000000000000000000000000001000000000000000000n:
      return 'c3';
    case 0b0000000000000000000000000000000000000000000010000000000000000000n:
      return 'd3';
    case 0b0000000000000000000000000000000000000000000100000000000000000000n:
      return 'e3';
    case 0b0000000000000000000000000000000000000000001000000000000000000000n:
      return 'f3';
    case 0b0000000000000000000000000000000000000000010000000000000000000000n:
      return 'g3';
    case 0b0000000000000000000000000000000000000000100000000000000000000000n:
      return 'h3';
    case 0b0000000000000000000000000000000000000001000000000000000000000000n:
      return 'a4';
    case 0b0000000000000000000000000000000000000010000000000000000000000000n:
      return 'b4';
    case 0b0000000000000000000000000000000000000100000000000000000000000000n:
      return 'c4';
    case 0b0000000000000000000000000000000000001000000000000000000000000000n:
      return 'd4';
    case 0b0000000000000000000000000000000000010000000000000000000000000000n:
      return 'e4';
    case 0b0000000000000000000000000000000000100000000000000000000000000000n:
      return 'f4';
    case 0b0000000000000000000000000000000001000000000000000000000000000000n:
      return 'g4';
    case 0b0000000000000000000000000000000010000000000000000000000000000000n:
      return 'h4';
    case 0b0000000000000000000000000000000100000000000000000000000000000000n:
      return 'a5';
    case 0b0000000000000000000000000000001000000000000000000000000000000000n:
      return 'b5';
    case 0b0000000000000000000000000000010000000000000000000000000000000000n:
      return 'c5';
    case 0b0000000000000000000000000000100000000000000000000000000000000000n:
      return 'd5';
    case 0b0000000000000000000000000001000000000000000000000000000000000000n:
      return 'e5';
    case 0b0000000000000000000000000010000000000000000000000000000000000000n:
      return 'f5';
    case 0b0000000000000000000000000100000000000000000000000000000000000000n:
      return 'g5';
    case 0b0000000000000000000000001000000000000000000000000000000000000000n:
      return 'h5';
    case 0b0000000000000000000000010000000000000000000000000000000000000000n:
      return 'a6';
    case 0b0000000000000000000000100000000000000000000000000000000000000000n:
      return 'b6';
    case 0b0000000000000000000001000000000000000000000000000000000000000000n:
      return 'c6';
    case 0b0000000000000000000010000000000000000000000000000000000000000000n:
      return 'd6';
    case 0b0000000000000000000100000000000000000000000000000000000000000000n:
      return 'e6';
    case 0b0000000000000000001000000000000000000000000000000000000000000000n:
      return 'f6';
    case 0b0000000000000000010000000000000000000000000000000000000000000000n:
      return 'g6';
    case 0b0000000000000000100000000000000000000000000000000000000000000000n:
      return 'h6';
    case 0b0000000000000001000000000000000000000000000000000000000000000000n:
      return 'a7';
    case 0b0000000000000010000000000000000000000000000000000000000000000000n:
      return 'b7';
    case 0b0000000000000100000000000000000000000000000000000000000000000000n:
      return 'c7';
    case 0b0000000000001000000000000000000000000000000000000000000000000000n:
      return 'd7';
    case 0b0000000000010000000000000000000000000000000000000000000000000000n:
      return 'e7';
    case 0b0000000000100000000000000000000000000000000000000000000000000000n:
      return 'f7';
    case 0b0000000001000000000000000000000000000000000000000000000000000000n:
      return 'g7';
    case 0b0000000010000000000000000000000000000000000000000000000000000000n:
      return 'h7';
    case 0b0000000100000000000000000000000000000000000000000000000000000000n:
      return 'a8';
    case 0b0000001000000000000000000000000000000000000000000000000000000000n:
      return 'b8';
    case 0b0000010000000000000000000000000000000000000000000000000000000000n:
      return 'c8';
    case 0b0000100000000000000000000000000000000000000000000000000000000000n:
      return 'd8';
    case 0b0001000000000000000000000000000000000000000000000000000000000000n:
      return 'e8';
    case 0b0010000000000000000000000000000000000000000000000000000000000000n:
      return 'f8';
    case 0b0100000000000000000000000000000000000000000000000000000000000000n:
      return 'g8';
    case 0b1000000000000000000000000000000000000000000000000000000000000000n:
      return 'h8';
  }
};

export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const getSquares = (moves: bigint): Array<bigint> => {
  let squares = [];
  for (let i = 0; i < 64; i++) {
    if ((moves & (1n << BigInt(i))) != 0n) {
      squares.push(1n << BigInt(i));
    }
  }
  return squares;
};

export const getFen = (
  white: bigint,
  black: bigint,
  pieces: [bigint, bigint, bigint, bigint, bigint, bigint],
  turn: boolean,
  half_move: number,
  full_move: number,
  en_passant_square: Square | undefined,
  castle_rights: [boolean, boolean, boolean, boolean],
): string => {
  let fen = '';
  let board = white | black;
  let empty = 0;

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      let square = 1n << BigInt(56 - rank * 8 + file);
      let color = (white & square) != 0n;

      if ((board & square) == 0n) {
        empty++;
      } else {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }

        switch (getPieceFromBitboards(pieces, square)) {
          case Piece.PAWN:
            fen += color ? 'P' : 'p';
            break;
          case Piece.KNIGHT:
            fen += color ? 'N' : 'n';
            break;

          case Piece.BISHOP:
            fen += color ? 'B' : 'b';
            break;

          case Piece.ROOK:
            fen += color ? 'R' : 'r';
            break;

          case Piece.QUEEN:
            fen += color ? 'Q' : 'q';
            break;

          case Piece.KING:
            fen += color ? 'K' : 'k';
            break;
          default:
            break;
        }
      }
    }
    if (empty > 0) {
      fen += empty;
      empty = 0;
    }

    if (rank < 7) {
      fen += '/';
    }
  }

  let castling = '';

  if (castle_rights[0]) {
    castling += 'K';
  }

  if (castle_rights[1]) {
    castling += 'Q';
  }

  if (castle_rights[2]) {
    castling += 'k';
  }

  if (castle_rights[3]) {
    castling += 'q';
  }

  if (castling == '') {
    castling = '-';
  }

  fen += `${turn ? ' w' : ' b'} ${castling} ${en_passant_square ?? '-'} ${half_move} ${full_move}`;

  return fen;
};

export const getPieceFromBitboards = (
  pieces: [bigint, bigint, bigint, bigint, bigint, bigint],
  square: bigint,
): Piece | undefined => {
  for (let i = 0; i < pieces.length; i++) {
    if ((pieces[i] & square) != 0n) {
      return i;
    }
  }
};

export const getAsciiFromBitboard = (bitboard: bigint): string => {
  let ascii = '';
  for (let i = 0; i < 64; i++) {
    let index = 56 - Math.floor(i / 8) * 8 + (i % 8);
    if ((bitboard & (1n << BigInt(index))) != 0n) {
      ascii += '1';
    } else {
      ascii += '0';
    }
    if (i % 8 == 7) {
      ascii += '\n';
    }
  }
  return ascii;
};
