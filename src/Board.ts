import { ChessMove, SanMove } from './move';
import { Move, Square, TemporaryMove } from './types';
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
  squareFromBigInt,
  RANK_5,
  RANK_4,
  getSquaresFromBigInt,
} from './utils';

export class Board {
  white: bigint = 0n;
  black: bigint = 0n;

  static_white_attack_mask: bigint = 0n;
  static_black_attack_mask: bigint = 0n;

  pieces: [bigint, bigint, bigint, bigint, bigint, bigint] = [0n, 0n, 0n, 0n, 0n, 0n];
  dynamic_piece_squares: Array<number> = [];
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

  constructor(fen = START_FEN) {
    this.load_fen(fen);

    this.generate_legal_moves();
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

  public export_fen(): string {
    return this.get_fen_from_bitboard(this.white, this.black, this.pieces, this.castle_rights);
  }

  get_fen_from_bitboard(
    white: bigint,
    black: bigint,
    pieces: [bigint, bigint, bigint, bigint, bigint, bigint],
    castle_rights: [boolean, boolean, boolean, boolean],
  ): string {
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

          switch (this.get_piece_from_bitboards(pieces, square)) {
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

    fen += `${this.turn ? ' w' : ' b'} ${castling} ${this.en_passant_square ?? '-'} ${this.half_move} ${
      this.full_move
    }`;

    return fen;
  }

  get_piece_from_bitboards(
    pieces: [bigint, bigint, bigint, bigint, bigint, bigint],
    square: bigint,
  ): Piece | undefined {
    for (let i = 0; i < pieces.length; i++) {
      if ((pieces[i] & square) != 0n) {
        return i;
      }
    }
  }

  clear() {
    this.black = 0n;
    this.pieces = [0n, 0n, 0n, 0n, 0n, 0n];
    this.turn = true;
    this.castle_rights = [true, true, true, true];
    this.en_passant_square = undefined;
    this.half_move = 0;
    this.full_move = 0;
    this.board_repetitions = {};
    this.history = [];
  }

  generate_legal_moves() {
    this.generate_pseudo_legal_moves();

    Object.entries(this.pseudo_legal_moves).forEach(([square, moves]) => {
      let current_squrare = 1n << BigInt(SquareIndex[square as Square]);

      let color = (this.white & current_squrare) != 0n;
      let piece = this.get_piece_from_bitboards(this.pieces, current_squrare);

      if ((current_squrare & this.get_color(this.turn)) == 0n || (current_squrare && this.all() == 0n)) {
        this.legal_moves[square as Square] = 0n;
      } else {
        let legal_moves = 0n;
        let current_board_without_piece = this.all() & ~current_squrare;

        for (const potential_square of Board.get_squares(moves)) {
          let board = current_board_without_piece | potential_square;
          let enemy_attack_mask = this.get_attack_mask(color, board);

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
              let king = this.pieces[Piece.KING] & this.get_color(color);

              if ((enemy_attack_mask & king) == 0n) {
                legal_moves |= potential_square;
              }
          }
        }
        this.legal_moves[square as Square] = legal_moves;
      }
    });
  }

  generate_pseudo_legal_moves() {
    this.static_white_attack_mask = 0n;
    this.static_black_attack_mask = 0n;
    this.dynamic_piece_squares = [];

    for (let i = 0; i < 64; i++) {
      let square = 1n << BigInt(i);

      if ((this.all() & square) != 0n) {
        let color = (this.white & square) != 0n;
        let piece = this.get_piece_from_bitboards(this.pieces, square);

        let mask;
        switch (piece) {
          case Piece.PAWN:
            switch (color) {
              case true:
                this.static_white_attack_mask |= square << BigInt(7);
                this.static_white_attack_mask |= square << BigInt(9);
                break;
              case false:
                this.static_black_attack_mask |= square >> BigInt(7);
                this.static_black_attack_mask |= square >> BigInt(9);
                break;
            }
            this.pseudo_legal_moves[SQUARES[i]] = this.generate_pawn_moves(square);
            break;
          case Piece.BISHOP:
          case Piece.ROOK:
          case Piece.QUEEN:
            mask = 0n;

            switch (piece) {
              case Piece.BISHOP:
                mask = this.generate_bishop_moves(square, this.all());
                break;
              case Piece.ROOK:
                mask = this.generate_rook_moves(square, this.all());
                break;
              case Piece.QUEEN:
                mask = this.generate_queen_moves(square, this.all());
                break;
            }

            this.dynamic_piece_squares.push(i);
            this.pseudo_legal_moves[SQUARES[i]] = mask & ~this.get_color(color);
            break;
          case Piece.KNIGHT:
            mask = this.generate_knight_moves(square);

            switch (color) {
              case true:
                this.static_white_attack_mask |= mask;
                break;
              case false:
                this.static_black_attack_mask |= mask;
                break;
            }

            this.pseudo_legal_moves[SQUARES[i]] = mask & ~this.get_color(color);
            break;
          case Piece.KING:
            mask = this.generate_king_moves(square);

            switch (color) {
              case true:
                this.static_white_attack_mask |= mask;

                if (this.turn) {
                  if (this.castle_rights[0] && (WHITE_KING_SIDE_CASTLE & this.all()) == 0n) {
                    mask |= 1n << BigInt(SquareIndex['g1']);
                  }

                  if (this.castle_rights[1] && (WHITE_QUEEN_SIDE_CASTLE & this.all()) == 0n) {
                    mask |= 1n << BigInt(SquareIndex['c1']);
                  }
                }
                break;
              case false:
                this.static_black_attack_mask |= mask;

                if (!this.turn) {
                  if (this.castle_rights[2] && (BLACK_KING_SIDE_CASTLE & this.all()) == 0n) {
                    mask |= 1n << BigInt(SquareIndex['g8']);
                  }

                  if (this.castle_rights[3] && (BLACK_QUEEN_SIDE_CASTLE & this.all()) == 0n) {
                    mask |= 1n << BigInt(SquareIndex['c8']);
                  }
                }
                break;
            }

            this.pseudo_legal_moves[SQUARES[i]] = mask & ~this.get_color(color);
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

  generate_pawn_moves(square: bigint): bigint {
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
          if (square << BigInt(7) || square << BigInt(9)) {
            mask |= 1n << BigInt(SquareIndex[this.en_passant_square]);
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
          if (square >> BigInt(7) || square >> BigInt(9)) {
            mask |= 1n << BigInt(SquareIndex[this.en_passant_square]);
          }
        }

        return mask;
    }
  }

  generate_bishop_moves(square: bigint, board: bigint) {
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

  generate_rook_moves(square: bigint, board: bigint) {
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

  generate_queen_moves(square: bigint, board: bigint) {
    return this.generate_bishop_moves(square, board) | this.generate_rook_moves(square, board);
  }

  generate_knight_moves(square: bigint) {
    let mask = 0n;

    if ((square & FILE_A) == 0n && (square & (RANK_8 | RANK_7)) == 0n) {
      mask |= square << BigInt(15);
    }

    if ((square & FILE_H) == 0n && (square & (RANK_8 | RANK_7)) == 0n) {
      mask |= square << BigInt(17);
    }

    if ((square & FILE_A) == 0n && (square & (RANK_1 | RANK_2)) == 0n) {
      mask |= square >> BigInt(17);
    }

    if ((square & FILE_H) == 0n && (square & (RANK_1 | RANK_2)) == 0n) {
      mask |= square >> BigInt(15);
    }

    if ((square & FILE_A) == 0n && (square & (RANK_1 | RANK_8)) == 0n) {
      mask |= square << BigInt(6);
    }

    if ((square & FILE_H) == 0n && (square & (RANK_1 | RANK_8)) == 0n) {
      mask |= square << BigInt(10);
    }

    if ((square & FILE_A) == 0n && (square & (RANK_1 | RANK_8)) == 0n) {
      mask |= square >> BigInt(10);
    }

    if ((square & FILE_H) == 0n && (square & (RANK_1 | RANK_8)) == 0n) {
      mask |= square >> BigInt(6);
    }

    return mask;
  }

  generate_king_moves(square: bigint) {
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

  all(): bigint {
    return this.white | this.black;
  }

  get_color(color: boolean): bigint {
    return color ? this.white : this.black;
  }

  get_attack_mask(color: boolean, board: bigint): bigint {
    let enemy_attack_mask = 0n;

    switch (color) {
      case true:
        enemy_attack_mask = this.static_black_attack_mask;
        break;
      case false:
        enemy_attack_mask = this.static_white_attack_mask;
        break;
    }

    for (const dynamic_piece of this.dynamic_piece_squares) {
      let dynamic_piece_square = 1n << BigInt(dynamic_piece);
      let piece = this.get_piece_from_bitboards(this.pieces, dynamic_piece_square);
      let dynamic_piece_Color = (this.white & dynamic_piece_square) != 0n;

      if (dynamic_piece_Color == color) {
        continue;
      }

      switch (piece) {
        case Piece.BISHOP:
          enemy_attack_mask |= this.generate_bishop_moves(dynamic_piece_square, board);
          break;
        case Piece.ROOK:
          enemy_attack_mask |= this.generate_rook_moves(dynamic_piece_square, board);
          break;
        case Piece.QUEEN:
          enemy_attack_mask |= this.generate_queen_moves(dynamic_piece_square, board);
          break;
        default:
          break;
      }
    }

    return enemy_attack_mask;
  }

  public get_move(move: string | Move): TemporaryMove | undefined {
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
      let potential_piece = this.get_piece_from_bitboards(this.pieces, from);
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
          (!this.turn && this.castle_rights[3] && (to & BLACK_KING_SIDE_CASTLE_SQUARE) != 0n))) ||
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
    } else if (promotion) {
      Object.entries(this.legal_moves).forEach(([square, moves]) => {
        let piece_square = 1n << BigInt(SquareIndex[square as Square]);

        if ((piece_square & (white | black)) != 0n) {
          let color = (white & piece_square) != 0n;
          let potential_piece = this.get_piece_from_bitboards(pieces, piece_square);

          if (color == this.turn && potential_piece == piece && from > 0n && (piece_square & from) != 0n && promotion) {
            for (const valid_square of Board.get_squares(moves)) {
              if ((valid_square & to) != 0n) {
                let captured;

                pieces[piece] ^= from;

                switch (color) {
                  case true:
                    white ^= from;
                    white |= to;
                    if ((black & valid_square) != 0n) {
                      let captured_piece = this.get_piece_from_bitboards(pieces, valid_square);
                      if (captured_piece != undefined) {
                        pieces[captured_piece] ^= valid_square;
                        black ^= valid_square;
                        captured = captured_piece;
                      }
                    }
                    break;
                  case false:
                    black ^= from;
                    black |= to;
                    if ((white & valid_square) != 0n) {
                      let captured_piece = this.get_piece_from_bitboards(pieces, valid_square);
                      if (captured_piece != undefined) {
                        pieces[captured_piece] ^= valid_square;
                        white ^= valid_square;
                        captured = captured_piece;
                      }
                    }
                    break;
                }

                pieces[promotion] |= to;

                result = {
                  piece,
                  from: square as Square,
                  to: squareFromBigInt(to)!,
                  promotion,
                  captured,
                };
              }
            }
          }
        }
      });
    } else {
      Object.entries(this.legal_moves).forEach(([square, moves]) => {
        let piece_square = 1n << BigInt(SquareIndex[square as Square]);

        if ((piece_square & (white | black)) != 0n) {
          let color = (white & piece_square) != 0n;
          let potential_piece = this.get_piece_from_bitboards(pieces, piece_square);

          if (
            color == this.turn &&
            potential_piece == piece &&
            ((from > 0n && (piece_square & from) != 0n) || from == 0n)
          ) {
            for (const valid_square of Board.get_squares(moves)) {
              if ((valid_square & to) != 0n) {
                let captured;

                if (this.en_passant_square) {
                  let en_passant_square = 1n << BigInt(SquareIndex[this.en_passant_square]);
                  if ((valid_square & en_passant_square) != 0n && piece == Piece.PAWN) {
                    pieces[Piece.PAWN] ^= en_passant_square;

                    switch (color) {
                      case true:
                        black ^= en_passant_square >> 8n;
                        pieces[Piece.PAWN] ^= en_passant_square >> 8n;
                        break;
                      case false:
                        white ^= en_passant_square << 8n;
                        pieces[Piece.PAWN] ^= en_passant_square << 8n;
                        break;
                    }
                  }
                }

                pieces[piece] ^= from;

                switch (color) {
                  case true:
                    white ^= from;
                    white |= to;
                    if ((black & valid_square) != 0n) {
                      let captured_piece = this.get_piece_from_bitboards(pieces, valid_square);
                      if (captured_piece != undefined) {
                        pieces[captured_piece] ^= valid_square;
                        black ^= valid_square;
                        captured = captured_piece;
                      }
                    }
                    break;
                  case false:
                    black ^= from;
                    black |= to;
                    if ((white & valid_square) != 0n) {
                      let captured_piece = this.get_piece_from_bitboards(pieces, valid_square);
                      if (captured_piece != undefined) {
                        pieces[captured_piece] ^= valid_square;
                        white ^= valid_square;
                        captured = captured_piece;
                      }
                    }
                    break;
                }

                result = {
                  piece,
                  from: square as Square,
                  to: squareFromBigInt(to)!,
                  captured,
                };
              }
            }
          }
        }
      });
    }

    return result;
  }

  public move(move: string | Move): void {
    let chess_move = this.get_move(move);

    if (chess_move) {
      let before = this.export_fen();
      if (chess_move.captured) {
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
            case true: {
              this.castle_rights[0] = false;
              this.castle_rights[1] = false;
            }
            case false:
              {
                this.castle_rights[2] = false;
                this.castle_rights[3] = false;
              }
              break;
          }
        case Piece.ROOK:
          switch (this.turn) {
            case true:
              if (this.castle_rights[0]) {
                if ((chess_move.from = 'h1')) {
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
        case Piece.PAWN:
          switch (this.turn) {
            case true:
              if ((from_square & RANK_2) != 0n) {
                if ((to_square & RANK_4) != 0n) {
                  let black_pawns = this.pieces[Piece.PAWN] & this.black;
                  if ((this.all() & (to_square >> 8n)) == 0n) {
                    if ((to_square & FILE_A) == 0n && (black_pawns & (to_square >> 1n)) != 0n) {
                      this.en_passant_square = squareFromBigInt(to_square >> 8n);
                    }
                    if ((to_square & FILE_H) == 0n && (black_pawns & (to_square << 1n)) != 0n) {
                      this.en_passant_square = squareFromBigInt(to_square >> 8n);
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
                      this.en_passant_square = squareFromBigInt(to_square << 8n);
                    }

                    if ((to_square & FILE_H) == 0n && (white_pawns & (to_square << 1n)) != 0n) {
                      this.en_passant_square = squareFromBigInt(to_square << 8n);
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
              let captured_piece = this.get_piece_from_bitboards(this.pieces, to_square);
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
              let captured_piece = this.get_piece_from_bitboards(this.pieces, to_square);
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
              let captured_piece = this.get_piece_from_bitboards(this.pieces, to_square);
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
              let captured_piece = this.get_piece_from_bitboards(this.pieces, to_square);
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

      let after = this.export_fen();

      this.history.push(
        new ChessMove(
          chess_move.piece,
          before,
          after,
          chess_move.from,
          chess_move.to,
          chess_move.captured,
          chess_move.promotion,
          chess_move.castling,
        ),
      );

      let fen = after.split(' ')[0];
      this.board_repetitions[fen] = this.board_repetitions[fen] ? this.board_repetitions[fen] + 1 : 1;

      this.generate_legal_moves();
    }
  }

  static get_squares(moves: bigint): Array<bigint> {
    let squares = [];
    for (let i = 0; i < 64; i++) {
      if ((moves & (1n << BigInt(i))) != 0n) {
        squares.push(1n << BigInt(i));
      }
    }
    return squares;
  }

  valid_moves(): Record<any, Array<Square>> {
    let moves: Record<any, Array<Square>> = {};

    for (const [square, legal_moves] of Object.entries(this.legal_moves)) {
      moves[square] = getSquaresFromBigInt(legal_moves);
    }

    return moves;
  }

  ascii(): string {
    let board = '';
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        let square = 1n << BigInt(56 - rank * 8 + file);
        let piece: Piece | undefined = this.get_piece_from_bitboards(this.pieces, square);
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

  public is_checked(): boolean {
    let king = this.pieces[Piece.KING] & this.get_color(this.turn);
    let enemy_attack_mask = this.get_attack_mask(this.turn, this.all());

    return (enemy_attack_mask & king) != 0n;
  }

  public is_mate(): boolean {
    return this.is_checked() && !this.has_moves();
  }

  public is_stalemate(): boolean {
    return !this.is_checked() && !this.has_moves();
  }

  public is_fifty_moves(): boolean {
    return this.half_move >= 100;
  }

  public is_threefold_repetition(): boolean {
    let fen = this.export_fen().split(' ')[0];
    return this.board_repetitions[fen] >= 3;
  }

  public has_moves(): boolean {
    for (const [square, legal_moves] of Object.entries(this.legal_moves)) {
      if (legal_moves != 0n) {
        return true;
      }
    }

    return false;
  }
}
