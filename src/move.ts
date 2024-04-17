import { CastlingType, Square } from './types';
import {
  FILE_A,
  FILE_B,
  FILE_C,
  FILE_D,
  FILE_E,
  FILE_F,
  FILE_G,
  FILE_H,
  Piece,
  RANK_1,
  RANK_2,
  RANK_3,
  RANK_4,
  RANK_5,
  RANK_6,
  RANK_7,
  RANK_8,
} from './utils';

export class ChessMove {
  public piece: Piece;

  public before: string;
  public after: string;

  public from: Square;
  public to: Square;

  public captured?: Piece;
  public promotion?: Piece;

  public castling?: CastlingType;

  constructor(
    piece: Piece,
    before: string,
    after: string,
    from: Square,
    to: Square,
    captured?: Piece,
    promotion?: Piece,
    castling?: CastlingType,
  ) {
    this.piece = piece;
    this.before = before;
    this.after = after;
    this.from = from;
    this.to = to;
    this.captured = captured;
    this.promotion = promotion;
    this.castling = castling;
  }
}

export class SanMove {
  public san: string;
  public piece: Piece;
  public to: bigint;
  public from: bigint;

  public promotion?: Piece;
  public castling?: CastlingType;

  constructor(san: string) {
    this.san = san;

    let to = 0n;
    let from = 0n;

    let piece;
    let promotion_piece;

    let chars = san.split('');

    let index = 0;

    while (index < chars.length) {
      if (index == 0) {
        switch (chars[index]) {
          case 'N':
            piece = Piece.KNIGHT;
            break;
          case 'B':
            piece = Piece.BISHOP;
            break;
          case 'R':
            piece = Piece.ROOK;
            break;
          case 'Q':
            piece = Piece.QUEEN;
            break;
          case 'K':
            piece = Piece.KING;
            break;
          default:
            piece = Piece.PAWN;
            break;
        }
      }

      if (chars[index] == 'O' || chars[index] == '0') {
        if (!piece) {
          piece = Piece.KING;
        } else {
          throw new Error('Invalid castling move');
        }

        if (san.includes('O-O-O') || san.includes('0-0-0')) {
          this.castling = 'q';
          break;
        } else if (san.includes('O-O') || san.includes('0-0')) {
          this.castling = 'k';
          break;
        } else {
          throw new Error('Invalid castling move');
        }
      } else if (chars[index] == '=') {
        if (!promotion_piece) {
          let promotion = chars[index + 1];
          switch (promotion) {
            case 'Q':
              promotion_piece = Piece.QUEEN;
              break;
            case 'N':
              promotion_piece = Piece.KNIGHT;
              break;
            case 'B':
              promotion_piece = Piece.BISHOP;
              break;
            case 'R':
              promotion_piece = Piece.ROOK;
              break;
            default:
              throw new Error('Invalid promotion piece');
          }
          index += 1;
        } else {
          throw new Error('Invalid promotion move');
        }
        break;
      } else if (chars[index] >= 'a' && chars[index] <= 'h') {
        let square = 0n;

        switch (chars[index]) {
          case 'a':
            square = FILE_A;
            break;
          case 'b':
            square = FILE_B;
            break;
          case 'c':
            square = FILE_C;
            break;
          case 'd':
            square = FILE_D;
            break;
          case 'e':
            square = FILE_E;
            break;
          case 'f':
            square = FILE_F;
            break;
          case 'g':
            square = FILE_G;
            break;
          case 'h':
            square = FILE_H;
            break;
        }

        if (index != chars.length - 1) {
          let next = chars[index + 1];
          if (next >= '1' && next <= '8') {
            index++;
            switch (next) {
              case '1':
                square &= RANK_1;
                break;
              case '2':
                square &= RANK_2;
                break;
              case '3':
                square &= RANK_3;
                break;
              case '4':
                square &= RANK_4;
                break;
              case '5':
                square &= RANK_5;
                break;
              case '6':
                square &= RANK_6;
                break;
              case '7':
                square &= RANK_7;
                break;
              case '8':
                square &= RANK_8;
                break;
            }
          }
        }

        if (from === 0n) {
          from = square;
        } else {
          to = square;
        }
      } else if (chars[index] >= '1' && chars[index] <= '8') {
        let square = 0n;

        switch (chars[index]) {
          case '1':
            square = RANK_1;
            break;
          case '2':
            square = RANK_2;
            break;
          case '3':
            square = RANK_3;
            break;
          case '4':
            square = RANK_4;
            break;
          case '5':
            square = RANK_5;
            break;
          case '6':
            square = RANK_6;
            break;
          case '7':
            square = RANK_7;
            break;
          case '8':
            square = RANK_8;
            break;
        }

        if (from != 0n) {
          throw new Error('Invalid move');
        } else {
          from = square;
        }
      }

      index++;
    }

    this.from = from;
    this.to = to;

    if (to === 0n) {
      this.to = from;
      this.from = 0n;
    }

    if (piece !== undefined) {
      this.piece = piece;
    } else {
      throw new Error('Invalid move');
    }

    if (promotion_piece) {
      this.promotion = promotion_piece;
    }

    if (from === 0n && to === 0n) {
      throw new Error('Invalid move');
    }

    console.log(this);
  }
}
