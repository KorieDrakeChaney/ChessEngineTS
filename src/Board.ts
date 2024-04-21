import { ChessMove, SanMove } from './move';
import { Capture, Color, Move, PieceType, Square, TemporaryMove } from './types';
import {
  SQUARES,
  SquareIndex,
  BLACK_KING_SIDE_CASTLE,
  BLACK_QUEEN_SIDE_CASTLE,
  FILE_A,
  FILE_H,
  RANK_1,
  RANK_2,
  RANK_7,
  RANK_8,
  WHITE_KING_SIDE_CASTLE,
  WHITE_KING_SIDE_CASTLE_SQUARE,
  WHITE_QUEEN_SIDE_CASTLE,
  WHITE_QUEEN_SIDE_CASTLE_SQUARE,
  START_FEN,
  Piece,
  BLACK_KING_SIDE_CASTLE_SQUARE,
  RANK_5,
  RANK_4,
  getSquaresFromBigInt,
  getSquares,
  getFen,
  getPieceFromBitboards,
  FILE_G,
  FILE_B,
  BLACK_QUEEN_SIDE_CASTLE_SQUARE,
  PieceTypeIndex,
  getSquareFromBigInt,
} from './utils';

export class Board {
  white: bigint = 0n;
  black: bigint = 0n;

  pieces: [bigint, bigint, bigint, bigint, bigint, bigint] = [0n, 0n, 0n, 0n, 0n, 0n];
  pseudo_legal_moves: Record<Square, bigint> = {
    a1: 0n,
    b1: 0n,
    c1: 0n,
    d1: 0n,
    e1: 0n,
    f1: 0n,
    g1: 0n,
    h1: 0n,
    a2: 0n,
    b2: 0n,
    c2: 0n,
    d2: 0n,
    e2: 0n,
    f2: 0n,
    g2: 0n,
    h2: 0n,
    a3: 0n,
    b3: 0n,
    c3: 0n,
    d3: 0n,
    e3: 0n,
    f3: 0n,
    g3: 0n,
    h3: 0n,
    a4: 0n,
    b4: 0n,
    c4: 0n,
    d4: 0n,
    e4: 0n,
    f4: 0n,
    g4: 0n,
    h4: 0n,
    a5: 0n,
    b5: 0n,
    c5: 0n,
    d5: 0n,
    e5: 0n,
    f5: 0n,
    g5: 0n,
    h5: 0n,
    a6: 0n,
    b6: 0n,
    c6: 0n,
    d6: 0n,
    e6: 0n,
    f6: 0n,
    g6: 0n,
    h6: 0n,
    a7: 0n,
    b7: 0n,
    c7: 0n,
    d7: 0n,
    e7: 0n,
    f7: 0n,
    g7: 0n,
    h7: 0n,
    a8: 0n,
    b8: 0n,
    c8: 0n,
    d8: 0n,
    e8: 0n,
    f8: 0n,
    g8: 0n,
    h8: 0n,
  };

  legal_moves: Record<Square, bigint> = {
    a1: 0n,
    b1: 0n,
    c1: 0n,
    d1: 0n,
    e1: 0n,
    f1: 0n,
    g1: 0n,
    h1: 0n,
    a2: 0n,
    b2: 0n,
    c2: 0n,
    d2: 0n,
    e2: 0n,
    f2: 0n,
    g2: 0n,
    h2: 0n,
    a3: 0n,
    b3: 0n,
    c3: 0n,
    d3: 0n,
    e3: 0n,
    f3: 0n,
    g3: 0n,
    h3: 0n,
    a4: 0n,
    b4: 0n,
    c4: 0n,
    d4: 0n,
    e4: 0n,
    f4: 0n,
    g4: 0n,
    h4: 0n,
    a5: 0n,
    b5: 0n,
    c5: 0n,
    d5: 0n,
    e5: 0n,
    f5: 0n,
    g5: 0n,
    h5: 0n,
    a6: 0n,
    b6: 0n,
    c6: 0n,
    d6: 0n,
    e6: 0n,
    f6: 0n,
    g6: 0n,
    h6: 0n,
    a7: 0n,
    b7: 0n,
    c7: 0n,
    d7: 0n,
    e7: 0n,
    f7: 0n,
    g7: 0n,
    h7: 0n,
    a8: 0n,
    b8: 0n,
    c8: 0n,
    d8: 0n,
    e8: 0n,
    f8: 0n,
    g8: 0n,
    h8: 0n,
  };

  turn: boolean = true;
  castle_rights: [boolean, boolean, boolean, boolean] = [true, true, true, true];

  en_passant_square?: Square;

  half_move: number = 0;
  full_move: number = 0;

  board_repetitions: Record<string, number> = {};

  public history: ChessMove[] = [];

  public fen: string;

  constructor(fen = START_FEN) {
    this.load_fen(fen);

    this.fen = fen;

    this.generateLegalMoves();
  }

  public load_fen(fen: string): void {
    this.clear();
    fen.split('/').forEach((rank, index) => {
      let file = 0;

      if (index == 7) {
        let parts = rank.split(' ');
        this.turn = parts[1] == 'w';
        for (const castle_right of parts[2]) {
          switch (castle_right) {
            case 'K':
              this.castle_rights[0] = true;
              break;
            case 'Q':
              this.castle_rights[1] = true;
              break;
            case 'k':
              this.castle_rights[2] = true;
              break;
            case 'q':
              this.castle_rights[3] = true;
              break;
          }
        }

        this.en_passant_square = parts[3] == '-' ? undefined : (parts[3] as Square);

        this.half_move = parseInt(parts[4]);
        this.full_move = parseInt(parts[5]);
      }
      for (const c of rank) {
        if (file > 7) {
          break;
        }

        if (c >= '1' && c <= '8') {
          file += parseInt(c);
        } else {
          let square = 1n << BigInt(56 - index * 8 + file);
          let color = c == c.toUpperCase();

          switch (c.toLowerCase()) {
            case 'p':
              this.pieces[Piece.PAWN] |= square;
              break;

            case 'n':
              this.pieces[Piece.KNIGHT] |= square;
              break;

            case 'b':
              this.pieces[Piece.BISHOP] |= square;
              break;

            case 'r':
              this.pieces[Piece.ROOK] |= square;
              break;

            case 'q':
              this.pieces[Piece.QUEEN] |= square;
              break;

            case 'k':
              this.pieces[Piece.KING] |= square;
              break;
          }

          if (color) {
            this.white |= square;
          } else {
            this.black |= square;
          }

          file++;
        }
      }
    });
  }

  public exportFen(): string {
    return this.fen;
  }

  private clear() {
    this.black = 0n;
    this.pieces = [0n, 0n, 0n, 0n, 0n, 0n];
    this.turn = true;
    this.castle_rights = [false, false, false, false];
    this.en_passant_square = undefined;
    this.half_move = 0;
    this.full_move = 0;
    this.board_repetitions = {};
    this.history = [];
  }

  private generateLegalMoves() {
    this.generatePseudoLegalMoves();

    Object.entries(this.pseudo_legal_moves).forEach(([square, moves]) => {
      let current_squrare = 1n << BigInt(SquareIndex[square as Square]);

      let color = (this.white & current_squrare) != 0n;
      let piece = getPieceFromBitboards(this.pieces, current_squrare);

      if ((current_squrare & this.getColor(this.turn)) == 0n || (current_squrare && this.all() == 0n)) {
        this.legal_moves[square as Square] = 0n;
      } else {
        let legal_moves = 0n;
        let current_board_without_piece = this.all() & ~current_squrare;

        for (const potential_square of getSquares(moves)) {
          let board = current_board_without_piece | potential_square;
          let pieces: [bigint, bigint, bigint, bigint, bigint, bigint] = [...this.pieces];
          if ((potential_square & this.getColor(!this.turn)) != 0n) {
            let captured_piece = getPieceFromBitboards(pieces, potential_square);
            if (captured_piece != undefined) {
              pieces[captured_piece] ^= potential_square;
            }
          }

          let enemy_attack_mask = this.getAttackMask(color, board, pieces);

          switch (piece) {
            case Piece.KING:
              switch (color) {
                case true:
                  let g1 = 1n << BigInt(SquareIndex['g1']);
                  let c1 = 1n << BigInt(SquareIndex['c1']);

                  if ((potential_square & g1 && this.castle_rights[0]) != 0n) {
                    if ((enemy_attack_mask & WHITE_KING_SIDE_CASTLE) == 0n) {
                      legal_moves |= potential_square;
                    }
                  } else if ((potential_square & c1) != 0n && this.castle_rights[1]) {
                    if ((enemy_attack_mask & WHITE_QUEEN_SIDE_CASTLE) == 0n) {
                      legal_moves |= potential_square;
                    }
                  } else {
                    if ((enemy_attack_mask & potential_square) == 0n) {
                      legal_moves |= potential_square;
                    }
                  }
                  break;

                case false:
                  let g8 = 1n << BigInt(SquareIndex['g8']);
                  let c8 = 1n << BigInt(SquareIndex['c8']);

                  if ((potential_square & g8) != 0n && this.castle_rights[2]) {
                    if ((enemy_attack_mask & BLACK_KING_SIDE_CASTLE) == 0n) {
                      legal_moves |= potential_square;
                    }
                  } else if ((potential_square & c8) != 0n && this.castle_rights[3]) {
                    if ((enemy_attack_mask & BLACK_QUEEN_SIDE_CASTLE) == 0n) {
                      legal_moves |= potential_square;
                    }
                  } else {
                    if ((enemy_attack_mask & potential_square) == 0n) {
                      legal_moves |= potential_square;
                    }
                  }
                  break;
              }
              break;
            default:
              let king = this.pieces[Piece.KING] & this.getColor(color);

              if ((enemy_attack_mask & king) == 0n) {
                legal_moves |= potential_square;
              }
          }
        }
        this.legal_moves[square as Square] = legal_moves;
      }
    });
  }

  private generatePseudoLegalMoves() {
    for (let i = 0; i < 64; i++) {
      let square = 1n << BigInt(i);

      if ((this.all() & square) != 0n) {
        let color = (this.white & square) != 0n;
        let piece = getPieceFromBitboards(this.pieces, square);

        let mask;
        switch (piece) {
          case Piece.PAWN:
            this.pseudo_legal_moves[SQUARES[i]] = this.generatePawnMoves(square);
            break;
          case Piece.BISHOP:
          case Piece.ROOK:
          case Piece.QUEEN:
            mask = 0n;

            switch (piece) {
              case Piece.BISHOP:
                mask = this.generateBishopMoves(square, this.all());
                break;
              case Piece.ROOK:
                mask = this.generateRookMoves(square, this.all());
                break;
              case Piece.QUEEN:
                mask = this.generateQueenMoves(square, this.all());
                break;
            }

            this.pseudo_legal_moves[SQUARES[i]] = mask & ~this.getColor(color);
            break;
          case Piece.KNIGHT:
            mask = this.generateKnightMoves(square);

            switch (color) {
              case true:
                break;
              case false:
                break;
            }

            this.pseudo_legal_moves[SQUARES[i]] = mask & ~this.getColor(color);
            break;
          case Piece.KING:
            mask = this.generateKingMoves(square);

            switch (color) {
              case true:
                if (!this.isChecked()) {
                  if (this.turn) {
                    if (this.castle_rights[0] && (WHITE_KING_SIDE_CASTLE & this.all()) == 0n) {
                      mask |= 1n << BigInt(SquareIndex['g1']);
                    }

                    if (this.castle_rights[1] && (WHITE_QUEEN_SIDE_CASTLE & this.all()) == 0n) {
                      mask |= 1n << BigInt(SquareIndex['c1']);
                    }
                  }
                }
                break;
              case false:
                if (!this.turn) {
                  if (!this.isChecked()) {
                    if (this.castle_rights[2] && (BLACK_KING_SIDE_CASTLE & this.all()) == 0n) {
                      mask |= 1n << BigInt(SquareIndex['g8']);
                    }

                    if (this.castle_rights[3] && (BLACK_QUEEN_SIDE_CASTLE & this.all()) == 0n) {
                      mask |= 1n << BigInt(SquareIndex['c8']);
                    }
                  }
                }
                break;
            }

            this.pseudo_legal_moves[SQUARES[i]] = mask & ~this.getColor(color);
            break;
          default:
            this.pseudo_legal_moves[SQUARES[i]] = 0n;
            break;
        }
      } else {
        this.pseudo_legal_moves[SQUARES[i]] = 0n;
      }
    }
  }

  private generatePawnMoves(square: bigint): bigint {
    let color = (this.white & square) != 0n;

    let mask;
    switch (color) {
      case true:
        mask = 0n;

        if (((square << BigInt(7)) & this.black) != 0n) {
          mask |= square << BigInt(7);
        }

        if (((square << BigInt(9)) & this.black) != 0n) {
          mask |= square << BigInt(9);
        }

        if (((square << BigInt(8)) & this.all()) == 0n) {
          mask |= square << BigInt(8);

          if ((square & RANK_2) != 0n && ((square << BigInt(16)) & this.all()) == 0n) {
            mask |= square << BigInt(16);
          }
        }

        if (this.en_passant_square) {
          let en_passant_square = 1n << BigInt(SquareIndex[this.en_passant_square]);
          if (((square << BigInt(7)) & en_passant_square) != 0n || ((square << BigInt(9)) & en_passant_square) != 0n) {
            mask |= en_passant_square;
          }
        }

        return mask;

      case false:
        mask = 0n;

        if (((square >> BigInt(7)) & this.white) != 0n) {
          mask |= square >> BigInt(7);
        }

        if (((square >> BigInt(9)) & this.white) != 0n) {
          mask |= square >> BigInt(9);
        }

        if (((square >> BigInt(8)) & this.all()) == 0n) {
          mask |= square >> BigInt(8);

          if ((square & RANK_7) != 0n && ((square >> BigInt(16)) & this.all()) == 0n) {
            mask |= square >> BigInt(16);
          }
        }
        if (this.en_passant_square) {
          let en_passant_square = 1n << BigInt(SquareIndex[this.en_passant_square]);
          if (((square >> BigInt(7)) & en_passant_square) != 0n || ((square >> BigInt(9)) & en_passant_square) != 0n) {
            mask |= en_passant_square;
          }
        }

        return mask;
    }
  }

  private generateBishopMoves(square: bigint, board: bigint) {
    let mask = 0n;

    let up_left = square;
    while ((up_left & (RANK_8 | FILE_A)) == 0n) {
      up_left <<= BigInt(7);
      mask |= up_left;
      if ((up_left & board) != 0n) {
        break;
      }
    }

    let up_right = square;
    while ((up_right & (RANK_8 | FILE_H)) == 0n) {
      up_right <<= BigInt(9);
      mask |= up_right;
      if ((up_right & board) != 0n) {
        break;
      }
    }

    let down_left = square;
    while ((down_left & (RANK_1 | FILE_A)) == 0n) {
      down_left >>= BigInt(9);
      mask |= down_left;
      if ((down_left & board) != 0n) {
        break;
      }
    }

    let down_right = square;
    while ((down_right & (RANK_1 | FILE_H)) == 0n) {
      down_right >>= BigInt(7);
      mask |= down_right;
      if ((down_right & board) != 0n) {
        break;
      }
    }

    return mask;
  }

  private generateRookMoves(square: bigint, board: bigint) {
    let mask = 0n;

    let up = square;
    while ((up & RANK_8) == 0n) {
      up <<= BigInt(8);
      mask |= up;
      if ((up & board) != 0n) {
        break;
      }
    }

    let down = square;
    while ((down & RANK_1) == 0n) {
      down >>= BigInt(8);
      mask |= down;
      if ((down & board) != 0n) {
        break;
      }
    }

    let left = square;
    while ((left & FILE_A) == 0n) {
      left >>= 1n;
      mask |= left;
      if ((left & board) != 0n) {
        break;
      }
    }

    let right = square;
    while ((right & FILE_H) == 0n) {
      right <<= 1n;
      mask |= right;
      if ((right & board) != 0n) {
        break;
      }
    }

    return mask;
  }

  private generateQueenMoves(square: bigint, board: bigint) {
    return this.generateBishopMoves(square, board) | this.generateRookMoves(square, board);
  }

  private generateKnightMoves(square: bigint) {
    let mask = 0n;

    if ((square & FILE_A) == 0n && (square & (RANK_8 | RANK_7)) == 0n) {
      mask |= square << 15n;
    }

    if ((square & FILE_H) == 0n && (square & (RANK_8 | RANK_7)) == 0n) {
      mask |= square << 17n;
    }

    if ((square & FILE_A) == 0n && (square & (RANK_1 | RANK_2)) == 0n) {
      mask |= square >> 17n;
    }

    if ((square & FILE_H) == 0n && (square & (RANK_1 | RANK_2)) == 0n) {
      mask |= square >> 15n;
    }

    if ((square & (FILE_A | FILE_B)) == 0n && (square & RANK_8) == 0n) {
      mask |= square << 6n;
    }

    if ((square & (FILE_A | FILE_B)) == 0n && (square & RANK_1) == 0n) {
      mask |= square >> 10n;
    }

    if ((square & (FILE_H | FILE_G)) == 0n && (square & RANK_8) == 0n) {
      mask |= square << 10n;
    }

    // 2 right, 1 down
    if ((square & (FILE_H | FILE_G)) == 0n && (square & RANK_1) == 0n) {
      mask |= square >> 6n;
    }

    return mask;
  }

  private generateKingMoves(square: bigint) {
    let mask = 0n;

    if ((square & RANK_8) == 0n) {
      mask |= square << BigInt(8);
    }

    if ((square & RANK_1) == 0n) {
      mask |= square >> BigInt(8);
    }

    if ((square & FILE_A) == 0n) {
      mask |= square >> 1n;
    }

    if ((square & FILE_H) == 0n) {
      mask |= square << 1n;
    }

    if ((square & (RANK_8 | FILE_A)) == 0n) {
      mask |= square << BigInt(7);
    }

    if ((square & (RANK_8 | FILE_H)) == 0n) {
      mask |= square << BigInt(9);
    }

    if ((square & (RANK_1 | FILE_A)) == 0n) {
      mask |= square >> BigInt(9);
    }

    if ((square & (RANK_1 | FILE_H)) == 0n) {
      mask |= square >> BigInt(7);
    }

    return mask;
  }

  private all(): bigint {
    return this.white | this.black;
  }

  private getColor(color: boolean): bigint {
    return color ? this.white : this.black;
  }

  private getAttackMask(
    color: boolean,
    board: bigint,
    pieces: [bigint, bigint, bigint, bigint, bigint, bigint],
  ): bigint {
    let enemy_attack_mask = 0n;

    for (let i = 0; i < 63; i++) {
      let square = 1n << BigInt(i);

      if ((square & board) == 0n) {
        continue;
      }

      let piece = getPieceFromBitboards(pieces, square);
      let piece_color = (this.white & square) != 0n;

      if (piece_color == color) {
        continue;
      }

      switch (piece) {
        case Piece.PAWN:
          switch (color) {
            case true:
              enemy_attack_mask |= square << BigInt(7);
              enemy_attack_mask |= square << BigInt(9);
              break;
            case false:
              enemy_attack_mask |= square >> BigInt(7);
              enemy_attack_mask |= square >> BigInt(9);
              break;
          }
          break;
        case Piece.BISHOP:
          enemy_attack_mask |= this.generateBishopMoves(square, board);
          break;
        case Piece.ROOK:
          enemy_attack_mask |= this.generateRookMoves(square, board);
          break;
        case Piece.QUEEN:
          enemy_attack_mask |= this.generateQueenMoves(square, board);
          break;
        case Piece.KNIGHT:
          enemy_attack_mask |= this.generateKnightMoves(square);
          break;
        case Piece.KING:
          enemy_attack_mask |= this.generateKingMoves(square);
          break;
        default:
          break;
      }
    }

    return enemy_attack_mask;
  }

  public getMove(move: string | Move): TemporaryMove | undefined {
    let from = 0n;
    let to = 0n;
    let piece: Piece;
    let promotion: Piece | undefined;
    let castling: 'k' | 'q' | undefined;

    if (typeof move === 'string') {
      let san_move = new SanMove(move);
      from = san_move.from;
      to = san_move.to;
      piece = san_move.piece;
      promotion = san_move.promotion;
      castling = san_move.castling;
    } else {
      from = 1n << BigInt(SquareIndex[move.from]);
      to = 1n << BigInt(SquareIndex[move.to]);
      let potential_piece = getPieceFromBitboards(this.pieces, from);
      if (potential_piece == undefined) {
        return;
      }
      piece = potential_piece;
      promotion = move.promotion;
    }

    let white = this.white;
    let black = this.black;
    let pieces: [bigint, bigint, bigint, bigint, bigint, bigint] = [...this.pieces];

    let result: TemporaryMove | undefined;

    if (
      (piece == Piece.KING &&
        ((this.turn && this.castle_rights[0] && (to & WHITE_KING_SIDE_CASTLE_SQUARE) != 0n) ||
          (!this.turn && this.castle_rights[2] && (to & BLACK_KING_SIDE_CASTLE_SQUARE) != 0n))) ||
      castling == 'k'
    ) {
      let legal_moves;
      switch (this.turn) {
        case true:
          legal_moves = this.legal_moves['e1'];
          let g1 = 1n << BigInt(SquareIndex['g1']);

          if ((legal_moves & g1) != 0n) {
            let e1 = 1n << BigInt(SquareIndex['e1']);

            pieces[Piece.KING] ^= e1;
            pieces[Piece.KING] |= g1;

            white ^= e1;
            white |= g1;

            let f1 = 1n << BigInt(SquareIndex['f1']);
            let h1 = 1n << BigInt(SquareIndex['h1']);

            pieces[Piece.ROOK] ^= h1;
            pieces[Piece.ROOK] |= f1;

            white ^= h1;
            white |= f1;

            result = {
              piece,
              from: 'e1',
              to: 'g1',
              castling: 'k',
            };
          }
          break;
        case false:
          legal_moves = this.legal_moves['e8'];
          let g8 = 1n << BigInt(SquareIndex['g8']);

          if ((legal_moves & g8) != 0n) {
            let e8 = 1n << BigInt(SquareIndex['e8']);

            pieces[Piece.KING] ^= e8;
            pieces[Piece.KING] |= g8;

            black ^= e8;
            black |= g8;

            let f8 = 1n << BigInt(SquareIndex['f8']);
            let h8 = 1n << BigInt(SquareIndex['h8']);

            pieces[Piece.ROOK] ^= h8;
            pieces[Piece.ROOK] |= f8;

            black ^= h8;
            black |= f8;

            result = {
              piece,
              from: 'e8',
              to: 'g8',
              castling: 'k',
            };
          }
          break;
      }
    } else if (
      (piece == Piece.KING &&
        ((this.turn && this.castle_rights[1] && (to & WHITE_QUEEN_SIDE_CASTLE_SQUARE) != 0n) ||
          (!this.turn && this.castle_rights[3] && (to & BLACK_QUEEN_SIDE_CASTLE_SQUARE) != 0n))) ||
      castling == 'q'
    ) {
      let legal_moves;
      switch (this.turn) {
        case true:
          legal_moves = this.legal_moves['e1'];
          let c1 = 1n << BigInt(SquareIndex['c1']);

          if ((legal_moves & c1) != 0n) {
            let e1 = 1n << BigInt(SquareIndex['e1']);

            pieces[Piece.KING] ^= e1;
            pieces[Piece.KING] |= c1;

            white ^= e1;
            white |= c1;

            let d1 = 1n << BigInt(SquareIndex['d1']);
            let a1 = 1n << BigInt(SquareIndex['a1']);

            pieces[Piece.ROOK] ^= a1;
            pieces[Piece.ROOK] |= d1;

            white ^= a1;
            white |= d1;

            result = {
              piece,
              from: 'e1',
              to: 'c1',
              castling: 'q',
            };
          }
          break;
        case false:
          legal_moves = this.legal_moves['e8'];
          let c8 = 1n << BigInt(SquareIndex['c8']);

          if ((legal_moves & c8) != 0n) {
            let e8 = 1n << BigInt(SquareIndex['e8']);

            pieces[Piece.KING] ^= e8;
            pieces[Piece.KING] |= c8;

            black ^= e8;
            black |= c8;

            let d8 = 1n << BigInt(SquareIndex['d8']);
            let a8 = 1n << BigInt(SquareIndex['a8']);

            pieces[Piece.ROOK] ^= a8;
            pieces[Piece.ROOK] |= d8;

            black ^= a8;
            black |= d8;

            result = {
              piece,
              from: 'e8',
              to: 'c8',
              castling: 'q',
            };
          }
          break;
      }
    } else if (promotion != undefined) {
      Object.entries(this.legal_moves).forEach(([square, moves]) => {
        let piece_square = 1n << BigInt(SquareIndex[square as Square]);

        if ((piece_square & (white | black)) != 0n) {
          let color = (white & piece_square) != 0n;
          let potential_piece = getPieceFromBitboards(pieces, piece_square);

          if (color == this.turn && potential_piece == piece && from > 0n && (piece_square & from) != 0n) {
            if ((to & moves) != 0n) {
              let capture: Capture | undefined;

              pieces[piece!] ^= from;

              switch (color) {
                case true:
                  white ^= from;
                  white |= to;
                  if ((black & to) != 0n) {
                    let captured_piece = getPieceFromBitboards(pieces, to);
                    if (captured_piece != undefined) {
                      pieces[captured_piece] ^= to;
                      black ^= to;
                      capture = {
                        piece: PieceTypeIndex[captured_piece],
                        square: getSquareFromBigInt(to)!,
                      };
                    }
                  }
                  break;
                case false:
                  black ^= from;
                  black |= to;
                  if ((white & to) != 0n) {
                    let captured_piece = getPieceFromBitboards(pieces, to);
                    if (captured_piece != undefined) {
                      pieces[captured_piece] ^= to;
                      white ^= to;
                      capture = {
                        piece: PieceTypeIndex[captured_piece],
                        square: getSquareFromBigInt(to)!,
                      };
                    }
                  }
                  break;
              }

              pieces[promotion!] |= to;

              result = {
                piece,
                from: square as Square,
                to: getSquareFromBigInt(to)!,
                promotion,
                capture,
              };
            }
          }
        }
      });
    } else {
      Object.entries(this.legal_moves).forEach(([square, moves]) => {
        let piece_square = 1n << BigInt(SquareIndex[square as Square]);

        if ((piece_square & (white | black)) != 0n) {
          let color = (white & piece_square) != 0n;
          let potential_piece = getPieceFromBitboards(pieces, piece_square);

          if (
            color == this.turn &&
            potential_piece == piece &&
            ((from > 0n && (piece_square & from) != 0n) || from == 0n)
          ) {
            if ((to & moves) != 0n) {
              let capture: Capture | undefined;

              if (this.en_passant_square) {
                let en_passant_square = 1n << BigInt(SquareIndex[this.en_passant_square]);
                if ((to & en_passant_square) != 0n && piece == Piece.PAWN) {
                  pieces[Piece.PAWN] ^= en_passant_square;

                  let en_passant_capture_square;
                  switch (color) {
                    case true:
                      black ^= en_passant_square >> 8n;
                      en_passant_capture_square = en_passant_square >> 8n;
                      pieces[Piece.PAWN] ^= en_passant_capture_square;
                      break;
                    case false:
                      white ^= en_passant_square << 8n;
                      en_passant_capture_square = en_passant_square << 8n;
                      pieces[Piece.PAWN] ^= en_passant_capture_square;
                      break;
                  }

                  capture = {
                    piece: PieceTypeIndex[Piece.PAWN],
                    square: getSquareFromBigInt(en_passant_capture_square)!,
                  };
                }
              }

              pieces[piece] ^= from;

              switch (color) {
                case true:
                  white ^= from;
                  white |= to;
                  if ((black & to) != 0n) {
                    let captured_piece = getPieceFromBitboards(pieces, to);
                    if (captured_piece != undefined) {
                      pieces[captured_piece] ^= to;
                      black ^= to;
                      capture = {
                        piece: PieceTypeIndex[captured_piece],
                        square: getSquareFromBigInt(to)!,
                      };
                    }
                  }
                  break;
                case false:
                  black ^= from;
                  black |= to;
                  if ((white & to) != 0n) {
                    let captured_piece = getPieceFromBitboards(pieces, to);
                    if (captured_piece != undefined) {
                      pieces[captured_piece] ^= to;
                      white ^= to;
                      capture = {
                        piece: PieceTypeIndex[captured_piece],
                        square: getSquareFromBigInt(to)!,
                      };
                    }
                  }
                  break;
              }

              result = {
                piece,
                from: square as Square,
                to: getSquareFromBigInt(to)!,
                capture,
              };
            }
          }
        }
      });
    }

    return result;
  }

  public move(move: string | Move): ChessMove | undefined {
    let chess_move = this.getMove(move);

    if (chess_move) {
      let before = this.exportFen();
      if (chess_move.capture) {
        this.half_move = 0;
      } else {
        switch (chess_move.piece) {
          case Piece.PAWN:
            this.half_move = 0;
            break;
          default:
            this.half_move++;
            break;
        }
      }

      let from_square = 1n << BigInt(SquareIndex[chess_move.from]);
      let to_square = 1n << BigInt(SquareIndex[chess_move.to]);

      if (this.en_passant_square) {
        if (to_square == 1n << BigInt(SquareIndex[this.en_passant_square]) && chess_move.piece == Piece.PAWN) {
          switch (this.turn) {
            case true:
              this.pieces[Piece.PAWN] ^= to_square >> 8n;
              this.black ^= to_square >> 8n;
              break;
            case false:
              this.pieces[Piece.PAWN] ^= to_square << 8n;
              this.white ^= to_square << 8n;
              break;
          }
        }

        this.en_passant_square = undefined;
      }

      switch (chess_move.piece) {
        case Piece.KING:
          switch (this.turn) {
            case true:
              this.castle_rights[0] = false;
              this.castle_rights[1] = false;
              break;
            case false:
              this.castle_rights[2] = false;
              this.castle_rights[3] = false;
              break;
          }
          break;
        case Piece.ROOK:
          switch (this.turn) {
            case true:
              if (this.castle_rights[0]) {
                if (chess_move.from == 'h1') {
                  this.castle_rights[0] = false;
                }
              }
              if (this.castle_rights[1]) {
                if (chess_move.from == 'a1') {
                  this.castle_rights[1] = false;
                }
              }
              break;
            case false:
              if (this.castle_rights[2]) {
                if (chess_move.from == 'h8') {
                  this.castle_rights[2] = false;
                }
              }
              if (this.castle_rights[3]) {
                if (chess_move.from == 'a8') {
                  this.castle_rights[3] = false;
                }
              }
              break;
          }
          break;
        case Piece.PAWN:
          switch (this.turn) {
            case true:
              if ((from_square & RANK_2) != 0n) {
                if ((to_square & RANK_4) != 0n) {
                  let black_pawns = this.pieces[Piece.PAWN] & this.black;
                  if ((this.all() & (to_square >> 8n)) == 0n) {
                    if ((to_square & FILE_A) == 0n && (black_pawns & (to_square >> 1n)) != 0n) {
                      this.en_passant_square = getSquareFromBigInt(to_square >> 8n);
                    }
                    if ((to_square & FILE_H) == 0n && (black_pawns & (to_square << 1n)) != 0n) {
                      this.en_passant_square = getSquareFromBigInt(to_square >> 8n);
                    }
                  }
                }
              }

              if ((to_square & RANK_8) != 0n) {
                if (chess_move.promotion == undefined) {
                  chess_move.promotion = Piece.QUEEN;
                }
              }
              break;
            case false:
              if ((from_square & RANK_7) != 0n) {
                if ((to_square & RANK_5) != 0n) {
                  let white_pawns = this.pieces[Piece.PAWN] & this.white;
                  if ((this.all() & (to_square << 8n)) == 0n) {
                    if ((to_square & FILE_A) == 0n && (white_pawns & (to_square >> 1n)) != 0n) {
                      this.en_passant_square = getSquareFromBigInt(to_square << 8n);
                    }

                    if ((to_square & FILE_H) == 0n && (white_pawns & (to_square << 1n)) != 0n) {
                      this.en_passant_square = getSquareFromBigInt(to_square << 8n);
                    }
                  }
                }
              }

              if ((to_square & RANK_1) != 0n) {
                if (chess_move.promotion == undefined) {
                  chess_move.promotion = Piece.QUEEN;
                }
              }

              break;
          }
          break;
      }

      if (chess_move.castling != undefined) {
        switch (chess_move.castling) {
          case 'k':
            switch (this.turn) {
              case true:
                let g1 = 1n << BigInt(SquareIndex['g1']);
                let e1 = 1n << BigInt(SquareIndex['e1']);

                this.pieces[Piece.KING] ^= e1;
                this.pieces[Piece.KING] |= g1;
                this.white ^= e1;
                this.white |= g1;

                let f1 = 1n << BigInt(SquareIndex['f1']);
                let h1 = 1n << BigInt(SquareIndex['h1']);

                this.pieces[Piece.ROOK] ^= h1;
                this.pieces[Piece.ROOK] |= f1;
                this.white ^= h1;
                this.white |= f1;

                this.castle_rights[0] = false;
                this.castle_rights[1] = false;
                break;
              case false:
                let g8 = 1n << BigInt(SquareIndex['g8']);
                let e8 = 1n << BigInt(SquareIndex['e8']);

                this.pieces[Piece.KING] ^= e8;
                this.pieces[Piece.KING] |= g8;
                this.black ^= e8;
                this.black |= g8;

                let f8 = 1n << BigInt(SquareIndex['f8']);
                let h8 = 1n << BigInt(SquareIndex['h8']);

                this.pieces[Piece.ROOK] ^= h8;
                this.pieces[Piece.ROOK] |= f8;
                this.black ^= h8;
                this.black |= f8;

                this.castle_rights[2] = false;
                this.castle_rights[3] = false;
                break;
            }
            break;
          case 'q':
            switch (this.turn) {
              case true:
                let c1 = 1n << BigInt(SquareIndex['c1']);
                let e1 = 1n << BigInt(SquareIndex['e1']);

                this.pieces[Piece.KING] ^= e1;
                this.pieces[Piece.KING] |= c1;
                this.white ^= e1;
                this.white |= c1;

                let a1 = 1n << BigInt(SquareIndex['a1']);
                let d1 = 1n << BigInt(SquareIndex['d1']);

                this.pieces[Piece.ROOK] ^= a1;
                this.pieces[Piece.ROOK] |= d1;
                this.white ^= a1;
                this.white |= d1;

                this.castle_rights[0] = false;
                this.castle_rights[1] = false;
                break;
              case false:
                let c8 = 1n << BigInt(SquareIndex['c8']);
                let e8 = 1n << BigInt(SquareIndex['e8']);

                this.pieces[Piece.KING] ^= e8;
                this.pieces[Piece.KING] |= c8;
                this.black ^= e8;
                this.black |= c8;

                let d8 = 1n << BigInt(SquareIndex['d8']);
                let a8 = 1n << BigInt(SquareIndex['a8']);

                this.pieces[Piece.ROOK] ^= a8;
                this.pieces[Piece.ROOK] |= d8;
                this.black ^= a8;
                this.black |= d8;

                this.castle_rights[2] = false;
                this.castle_rights[3] = false;
                break;
            }
            break;
        }
      } else if (chess_move.promotion != undefined) {
        switch (this.turn) {
          case true:
            this.white ^= from_square;
            this.white |= to_square;
            if ((this.black & to_square) != 0n) {
              let captured_piece = getPieceFromBitboards(this.pieces, to_square);
              if (captured_piece != undefined) {
                this.pieces[captured_piece] ^= to_square;
                this.black ^= to_square;
              }
            }

            break;
          case false:
            this.black ^= from_square;
            this.black |= to_square;
            if ((this.white & to_square) != 0n) {
              let captured_piece = getPieceFromBitboards(this.pieces, to_square);
              if (captured_piece != undefined) {
                this.pieces[captured_piece] ^= to_square;
                this.white ^= to_square;
              }
            }
            break;
        }
        this.pieces[chess_move.promotion] |= to_square;
      } else {
        switch (this.turn) {
          case true:
            this.white ^= from_square;
            this.white |= to_square;

            if ((this.black & to_square) != 0n) {
              let captured_piece = getPieceFromBitboards(this.pieces, to_square);
              if (captured_piece != undefined) {
                this.pieces[captured_piece] ^= to_square;
                this.black ^= to_square;
              }
            }
            break;
          case false:
            this.black ^= from_square;
            this.black |= to_square;

            if ((this.white & to_square) != 0n) {
              let captured_piece = getPieceFromBitboards(this.pieces, to_square);
              if (captured_piece != undefined) {
                this.pieces[captured_piece] ^= to_square;
                this.white ^= to_square;
              }
            }
            break;
        }
        this.pieces[chess_move.piece] |= to_square;
      }

      this.pieces[chess_move.piece] ^= from_square;

      if (!this.turn) {
        this.full_move += 1;
      }

      this.turn = !this.turn;

      let after = getFen(
        this.white,
        this.black,
        this.pieces,
        this.turn,
        this.half_move,
        this.full_move,
        this.en_passant_square,
        this.castle_rights,
      );

      let prevLegalMoves = { ...this.legal_moves };

      let fen = after.split(' ')[0];
      this.board_repetitions[fen] = this.board_repetitions[fen] ? this.board_repetitions[fen] + 1 : 1;

      this.fen = after;
      this.generateLegalMoves();

      const san = this.getSanFromMove(chess_move, prevLegalMoves);

      let move = new ChessMove(
        PieceTypeIndex[chess_move.piece] as PieceType,
        !this.turn ? 'w' : 'b',
        before,
        after,
        chess_move.from,
        chess_move.to,
        san,
        chess_move.capture,
        chess_move.promotion != undefined ? PieceTypeIndex[chess_move.promotion] : undefined,
        chess_move.castling,
        this.isChecked(),
        this.isMate(),
      );

      this.history.push(move);

      return move;
    }
  }

  public getLegalMoves(): Record<any, Array<Square>> {
    let moves: Record<any, Array<Square>> = {};
    for (const [square, legal_moves] of Object.entries(this.legal_moves)) {
      moves[square] = getSquaresFromBigInt(legal_moves);
    }

    return moves;
  }

  public getLegalMovesFromSquare(square: Square): Array<Square> {
    return getSquaresFromBigInt(this.legal_moves[square]);
  }

  public ascii(): string {
    let board = '';
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        let square = 1n << BigInt(56 - rank * 8 + file);
        let piece: Piece | undefined = getPieceFromBitboards(this.pieces, square);
        let color = (this.white & square) != 0n;

        if (piece != undefined) {
          switch (piece) {
            case Piece.PAWN:
              board += color ? 'P' : 'p';
              break;
            case Piece.KNIGHT:
              board += color ? 'N' : 'n';
              break;
            case Piece.BISHOP:
              board += color ? 'B' : 'b';
              break;
            case Piece.ROOK:
              board += color ? 'R' : 'r';
              break;
            case Piece.QUEEN:
              board += color ? 'Q' : 'q';
              break;
            case Piece.KING:
              board += color ? 'K' : 'k';
              break;
          }
        } else {
          board += '.';
        }

        if ((square & FILE_H) != 0n) {
          board += '\n';
        }
      }
    }

    return board;
  }

  public isChecked(): boolean {
    let king = this.pieces[Piece.KING] & this.getColor(this.turn);
    let enemy_attack_mask = this.getAttackMask(this.turn, this.all(), this.pieces);

    return (enemy_attack_mask & king) != 0n;
  }

  public isMate(): boolean {
    return this.isChecked() && !this.hasMoves();
  }

  public isStalemate(): boolean {
    return !this.isChecked() && !this.hasMoves();
  }

  public isFiftyMoves(): boolean {
    return this.half_move >= 100;
  }

  public isThreefold(): boolean {
    let fen = this.exportFen().split(' ')[0];
    return this.board_repetitions[fen] >= 3;
  }

  public hasMoves(): boolean {
    for (const [square, legal_moves] of Object.entries(this.legal_moves)) {
      if (legal_moves != 0n) {
        return true;
      }
    }

    return false;
  }

  public isSquareOccupied(square: Square): boolean {
    let bit = 1n << BigInt(SquareIndex[square]);
    return (this.all() & bit) != 0n;
  }

  public isSquareAttacked(square: Square, color: boolean): boolean {
    let bit = 1n << BigInt(SquareIndex[square]);

    if ((bit & this.all()) == 0n) {
      return false;
    }

    let pieceColor = (this.white & bit) != 0n;

    if (pieceColor == color) {
      return false;
    }

    return true;
  }

  public getPieceOnSquare(square: Square):
    | {
        type: PieceType;
        color: Color;
      }
    | undefined {
    let bit = 1n << BigInt(SquareIndex[square]);
    let piece = getPieceFromBitboards(this.pieces, bit);
    let color = (this.white & bit) != 0n;

    switch (piece) {
      case Piece.PAWN:
        return {
          type: 'p',
          color: color ? 'w' : 'b',
        };
      case Piece.KNIGHT:
        return {
          type: 'n',
          color: color ? 'w' : 'b',
        };
      case Piece.BISHOP:
        return {
          type: 'b',
          color: color ? 'w' : 'b',
        };
      case Piece.ROOK:
        return {
          type: 'r',
          color: color ? 'w' : 'b',
        };
      case Piece.QUEEN:
        return {
          type: 'q',
          color: color ? 'w' : 'b',
        };
      case Piece.KING:
        return {
          type: 'k',
          color: color ? 'w' : 'b',
        };
    }
  }

  private getSanFromMove(move: TemporaryMove, prevLegalMoves: Record<Square, bigint>): string {
    if (move.castling != undefined) {
      const san = move.castling == 'k' ? 'O-O' : 'O-O-O';

      return san + (this.isMate() ? '#' : this.isChecked() ? '+' : '');
    }

    let san = '';

    switch (move.piece) {
      case Piece.PAWN:
        break;
      case Piece.KNIGHT:
        san += 'N';
        break;
      case Piece.BISHOP:
        san += 'B';
        break;
      case Piece.ROOK:
        san += 'R';
        break;
      case Piece.QUEEN:
        san += 'Q';
        break;
      case Piece.KING:
        san += 'K';
        break;
    }

    let disambiguation = '';

    if (move.piece != Piece.PAWN)
      Object.entries(prevLegalMoves).forEach(([square, moves]) => {
        if (square != move.from) {
          let piece_square = 1n << BigInt(SquareIndex[square as Square]);
          let piece = getPieceFromBitboards(this.pieces, piece_square);

          if (piece == move.piece && ((1n << BigInt(SquareIndex[move.to])) & moves) != 0n) {
            let new_square = getSquareFromBigInt(piece_square);
            if (new_square != undefined) {
              let rank = move.from[1];
              let file = move.from[0];

              if (new_square[1] == move.from[1]) {
                disambiguation += file;
              } else if (new_square[0] == move.from[0]) {
                disambiguation += rank;
              }
            }
          }
        }
      });

    let capture = '';

    if (move.capture != undefined) {
      if (move.piece == Piece.PAWN) {
        capture = move.from[0];
      }

      capture += 'x';
    }

    let promotion = '';

    if (move.promotion) {
      switch (move.promotion) {
        case Piece.QUEEN:
          promotion = '=Q';
          break;
        case Piece.ROOK:
          promotion = '=R';
          break;
        case Piece.BISHOP:
          promotion = '=B';
          break;
        case Piece.KNIGHT:
          promotion = '=N';
          break;
      }
    }

    return san + disambiguation + capture + move.to + promotion + (this.isMate() ? '#' : this.isChecked() ? '+' : '');
  }
}
