import { Bitboard } from './Bitboard';
import {
  StartFEN,
  History,
  Color,
  PieceData,
  SQUARES,
  SECONDRANK,
  SEVENTHRANK,
  Square,
  SquareIndex,
  FIRSTRANK,
  AFILE,
  BFILE,
  EIGHTHRANK,
  HFILE,
  GFILE,
  CastlingType,
  wkCastlingMask,
  wqCastlingMask,
  bkCastlingMask,
  bqCastlingMask,
  FOURTHRANK,
  FIFTHRANK,
} from './utils';

type MoveAttackData = {
  moves: bigint;
  attacks: bigint;
};

export class Board {
  moveHistory: History = [];
  turn: Color = 'w';
  moveList: Record<Square, bigint> = {
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

  validMoveList: Record<Square, bigint> = {
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

  castlingRights: Record<Color, Record<CastlingType, boolean>> = {
    w: {
      k: true,
      q: true,
    },
    b: {
      k: true,
      q: true,
    },
  };

  k = 0n;
  q = 0n;
  r = 0n;
  b = 0n;
  n = 0n;
  p = 0n;

  whiteBoard = 0n;
  blackBoard = 0n;

  whiteAttackMask = 0n;
  blackAttackMask = 0n;

  whiteValidMoves = 0n;
  blackValidMoves = 0n;

  pawnCaptures: Record<Color, bigint> = {
    w: 0n,
    b: 0n,
  };

  knightMoves: bigint[] = new Array().fill(0n, 0, 64);
  kingMoves: bigint[] = new Array().fill(0n, 0, 64);
  pawnAttacks: Record<Color, bigint[]> = {
    w: new Array().fill(0n, 0, 64),
    b: new Array().fill(0n, 0, 64),
  };

  halfMove: number = 0;
  fullMove: number = 0;

  enPassantSq: Square | '-' = '-';

  constructor(fen = StartFEN) {
    this.loadFen(fen);
    this.generateAllKnightMoves();
    this.generateAllKingMoves();
    this.generateAllPawnAttacks();
    this.generateLegalMoves();
  }

  loadFen(fen: string) {
    const reg = /^-?[\d.]+(?:e-?\d+)?$/;
    const values = fen.replaceAll('/', ' ').split(' ');

    for (const [i, value] of values.entries()) {
      let offset = 0;
      for (let j = 0; j < value.length; j++) {
        const coords = 0 + 8 * (7 - i) + offset;
        if (reg.test(value[j])) {
          offset += Number(value[j]);
        } else {
          const type: any = value[j].toLowerCase();

          if (type !== 'blank') {
            const color: 'w' | 'b' = value[j] === value[j].toUpperCase() ? 'w' : 'b';
            switch (type) {
              case 'k':
                this.k |= 1n << BigInt(coords);
                break;
              case 'q':
                this.q |= 1n << BigInt(coords);
                break;
              case 'r':
                this.r |= 1n << BigInt(coords);
                break;
              case 'b':
                this.b |= 1n << BigInt(coords);
                break;
              case 'n':
                this.n |= 1n << BigInt(coords);
                break;
              case 'p':
                this.p |= 1n << BigInt(coords);
                break;
            }
            if (color === 'w') this.whiteBoard |= 1n << BigInt(coords);
            else this.blackBoard |= 1n << BigInt(coords);
            offset += 1;
          }
        }
      }
    }

    this.turn = values[8] === 'w' ? 'w' : 'b';

    for (let j = 0; j < values[9].length; j++) {
      const color: 'w' | 'b' = values[9][j] === values[9][j].toUpperCase() ? 'w' : 'b';

      if (values[9][j].toLowerCase() === 'q') this.castlingRights[color].q = true;
      else if (values[9][j].toLowerCase() === 'k') this.castlingRights[color].k = true;
    }

    this.enPassantSq = values[10] as Square | '-';
    this.halfMove = Number(values[11]);
    this.fullMove = Number(values[12]);
  }

  public exportFen(): string {
    let fen = '';
    const overview = this.overview();
    let offset = 0;
    for (let i = 0; i < overview.length; i++) {
      const data = overview[i];
      if (data) {
        const piece = data.color === 'w' ? data.type.toUpperCase() : data.type;
        if (offset > 0) fen += offset;
        fen += piece;

        offset = 0;
      } else {
        offset++;
      }

      if ((i + 1) % 8 === 0 && i !== 63) {
        if (offset > 0) fen += offset;
        fen += '/';
        offset = 0;
      }
    }
    fen += ' ';

    fen += this.turn + ' ';
    let CastlingRights = '';

    /* tslint:disable:no-string-literal */
    if (this.castlingRights['w'].k) CastlingRights += 'K';
    /* tslint:disable:no-string-literal */
    if (this.castlingRights['w'].q) CastlingRights += 'Q';
    /* tslint:disable:no-string-literal */
    if (this.castlingRights['b'].k) CastlingRights += 'k';
    /* tslint:disable:no-string-literal */
    if (this.castlingRights['b'].q) CastlingRights += 'q';

    fen +=
      (CastlingRights.length < 1 ? '-' : CastlingRights) +
      ' ' +
      this.enPassantSq +
      ' ' +
      this.halfMove +
      ' ' +
      this.fullMove +
      ' ';

    return fen;
  }

  public overview(): (PieceData | undefined)[] {
    const pieces: (PieceData | undefined)[] = [];

    let offset = 0;
    for (let i = 0; i < 64; i++) {
      const coords = 0 + 8 * (7 - offset) + (i % 8);
      const color: Color = ((1n << BigInt(coords)) & this.whiteBoard) !== 0n ? 'w' : 'b';
      if ((this.k & (1n << BigInt(coords))) !== 0n) pieces.push({ type: 'k', color, square: SQUARES[coords] });
      else if ((this.q & (1n << BigInt(coords))) !== 0n) pieces.push({ type: 'q', color, square: SQUARES[coords] });
      else if ((this.r & (1n << BigInt(coords))) !== 0n) pieces.push({ type: 'r', color, square: SQUARES[coords] });
      else if ((this.b & (1n << BigInt(coords))) !== 0n) pieces.push({ type: 'b', color, square: SQUARES[coords] });
      else if ((this.n & (1n << BigInt(coords))) !== 0n) pieces.push({ type: 'n', color, square: SQUARES[coords] });
      else if ((this.p & (1n << BigInt(coords))) !== 0n) pieces.push({ type: 'p', color, square: SQUARES[coords] });
      else {
        pieces.push(undefined);
      }
      if ((i + 1) % 8 === 0) offset++;
    }

    return pieces;
  }

  private generatePseudoLegalMoves(): void {
    /* tslint:disable:no-string-literal */
    this.pawnCaptures['w'] = 0n;
    /* tslint:disable:no-string-literal */
    this.pawnCaptures['b'] = 0n;
    this.whiteAttackMask = 0n;
    this.blackAttackMask = 0n;

    /* tslint:disable:no-string-literal */
    if (this.castlingRights['w'].k)
      if ((this.r & this.whiteBoard & (1n << BigInt(SquareIndex['h1']))) === 0n) this.castlingRights['w'].k = false;
    /* tslint:disable:no-string-literal */
    if (this.castlingRights['w'].q)
      if ((this.r & this.whiteBoard & (1n << BigInt(SquareIndex['a1']))) === 0n) this.castlingRights['w'].q = false;
    /* tslint:disable:no-string-literal */
    if (this.castlingRights['b'].k)
      if ((this.r & this.blackBoard & (1n << BigInt(SquareIndex['h8']))) === 0n) this.castlingRights['b'].k = false;
    /* tslint:disable:no-string-literal */
    if (this.castlingRights['b'].q)
      if ((this.r & this.blackBoard & (1n << BigInt(SquareIndex['a8']))) === 0n) this.castlingRights['b'].q = false;

    for (let i = 0; i < 64; i++) {
      const color: Color = ((1n << BigInt(i)) & this.whiteBoard) !== 0n ? 'w' : 'b';
      this.validMoveList[SQUARES[i]] = 0n;
      if (color !== this.turn) continue;
      if ((this.k & (1n << BigInt(i))) !== 0n) {
        this.moveList[SQUARES[i]] = this.kingMoves[i] & ~(color === 'w' ? this.whiteBoard : this.blackBoard);
      } else if ((this.q & (1n << BigInt(i))) !== 0n) {
        this.moveList[SQUARES[i]] = this.generateRookMoves(i, color).moves | this.generateBishopMoves(i, color).moves;
      } else if ((this.r & (1n << BigInt(i))) !== 0n) {
        this.moveList[SQUARES[i]] = this.generateRookMoves(i, color).moves;
      } else if ((this.b & (1n << BigInt(i))) !== 0n) {
        this.moveList[SQUARES[i]] = this.generateBishopMoves(i, color).moves;
      } else if ((this.n & (1n << BigInt(i))) !== 0n) {
        this.moveList[SQUARES[i]] = this.knightMoves[i] & ~(color === 'w' ? this.whiteBoard : this.blackBoard);
      } else if ((this.p & (1n << BigInt(i))) !== 0n) {
        this.pawnCaptures[color] |= this.pawnAttacks[color][i] & (color === 'w' ? this.blackBoard : this.whiteBoard);
        this.moveList[SQUARES[i]] = this.generatePawnMoves(i, color) | this.pawnCaptures[color];
      } else {
        this.moveList[SQUARES[i]] = 0n;
      }
    }

    this.whiteAttackMask = this.whiteAttacks();
    this.blackAttackMask = this.blackAttacks();

    if (this.castlingRights['w'].k) {
      if ((wkCastlingMask & (this.blackAttackMask | this.whiteBoard)) === 0n) {
        this.moveList['e1'] |= (1n << BigInt(SquareIndex['e1'])) << 2n;
      }
    }

    if (this.castlingRights['w'].q) {
      if ((wqCastlingMask & (this.blackAttackMask | this.whiteBoard)) === 0n) {
        this.moveList['e1'] |= (1n << BigInt(SquareIndex['e1'])) << -2n;
      }
    }

    if (this.castlingRights['b'].k) {
      if ((bkCastlingMask & (this.whiteAttackMask | this.blackBoard)) === 0n) {
        this.moveList['e8'] |= (1n << BigInt(SquareIndex['e8'])) << 2n;
      }
    }

    if (this.castlingRights['b'].q) {
      if ((bqCastlingMask & (this.whiteAttackMask | this.blackBoard)) === 0n) {
        this.moveList['e8'] |= (1n << BigInt(SquareIndex['e8'])) << -2n;
      }
    }
  }

  private generateLegalMoves() {
    this.generatePseudoLegalMoves();
    this.whiteValidMoves = 0n;
    this.blackValidMoves = 0n;

    // move validation
    for (let i = 0; i < 64; i++) {
      const color: Color = ((1n << BigInt(i)) & this.whiteBoard) !== 0n ? 'w' : 'b';
      if (color !== this.turn) continue;
      const moves = Bitboard.toSquares(this.moveList[SQUARES[i]]);
      if ((this.k & (1n << BigInt(i))) !== 0n) {
        this.validMoveList[SQUARES[i]] |=
          this.moveList[SQUARES[i]] & ~(color === 'w' ? this.blackAttackMask : this.whiteAttackMask);
      } else {
        for (let j = 0; j < moves.length; j++) {
          if (
            this.isMoveValid(
              SquareIndex[SQUARES[i]],
              SquareIndex[moves[j]],
              moves[j] === this.enPassantSq && (this.p & (1n << BigInt(i))) !== 0n,
            )
          )
            this.validMoveList[SQUARES[i]] |= 1n << BigInt(SquareIndex[moves[j]]);
        }
      }
      if (color === 'w') this.whiteValidMoves |= this.validMoveList[SQUARES[i]];
      else this.blackValidMoves |= this.validMoveList[SQUARES[i]];
    }
  }

  public validMoves(square: Square): Square[] {
    return Bitboard.toSquares(this.validMoveList[square]);
  }

  public move(from: Square, to: Square): boolean {
    const fromBit = 1n << BigInt(SquareIndex[from]);
    const toBit = 1n << BigInt(SquareIndex[to]);
    const color = (this.whiteBoard & fromBit) !== 0n ? 'w' : 'b';
    if (color !== this.turn) return false;
    if ((this.validMoveList[from] & toBit) === 0n) return false;
    if ((this.k & fromBit) !== 0n) {
      if (color === 'w') {
        if ((toBit & this.blackAttackMask) !== 0n) return false;

        if ((toBit & (1n << BigInt(SquareIndex['g1']))) !== 0n && this.castlingRights[color].k) {
          this.r &= ~(1n << BigInt(SquareIndex['h1']));
          this.r |= 1n << BigInt(SquareIndex['f1']);
          this.whiteBoard |= 1n << BigInt(SquareIndex['f1']);
        } else if ((toBit & (1n << BigInt(SquareIndex['c1']))) !== 0n && this.castlingRights[color].q) {
          this.r &= ~(1n << BigInt(SquareIndex['a1']));
          this.r |= 1n << BigInt(SquareIndex['d1']);
          this.whiteBoard |= 1n << BigInt(SquareIndex['d1']);
        }
      } else {
        if ((toBit & (1n << BigInt(SquareIndex['g8']))) !== 0n && this.castlingRights[color].k) {
          this.r &= ~(1n << BigInt(SquareIndex['h8']));
          this.r |= 1n << BigInt(SquareIndex['f8']);
          this.blackBoard |= 1n << BigInt(SquareIndex['f8']);
        } else if ((toBit & (1n << BigInt(SquareIndex['c8']))) !== 0n && this.castlingRights[color].q) {
          this.r &= ~(1n << BigInt(SquareIndex['a8']));
          this.r |= 1n << BigInt(SquareIndex['d8']);
          this.blackBoard |= 1n << BigInt(SquareIndex['d8']);
        }
      }
    }

    this.halfMove++;
    if (this.turn === 'b') this.fullMove++;
    this.turn = this.turn === 'w' ? 'b' : 'w';

    // captures

    if ((fromBit & this.p) !== 0n) {
      if (color === 'w' && (toBit & this.pawnCaptures['w']) !== 0n) this.blackBoard &= ~toBit;
      else if ((toBit & this.pawnCaptures['b']) !== 0n) this.whiteBoard &= ~toBit;

      if (to === this.enPassantSq) {
        if (color === 'w') this.blackBoard &= ~(toBit << -8n);
        else this.whiteBoard &= ~(toBit << 8n);

        this.enPassantSq = '-';
      }

      if (color === 'w') {
        if ((toBit & FOURTHRANK) !== 0n) {
          if (((toBit >> 1n) & (this.p & this.blackBoard)) !== 0n && (fromBit & SECONDRANK) !== 0n)
            if (((toBit >> -8n) & this.all()) === 0n) this.enPassantSq = SQUARES[SquareIndex[to] - 8];
          if (((toBit >> -1n) & (this.p & this.blackBoard)) !== 0n && (fromBit & SECONDRANK) !== 0n)
            if (((toBit >> -8n) & this.all()) === 0n) this.enPassantSq = SQUARES[SquareIndex[to] - 8];
        }
      } else {
        if ((toBit & FIFTHRANK) !== 0n) {
          if (((toBit >> 1n) & (this.p & this.whiteBoard)) !== 0n && (fromBit & SEVENTHRANK) !== 0n)
            if (((toBit >> 8n) & this.all()) === 0n) this.enPassantSq = SQUARES[SquareIndex[to] + 8];
          if (((toBit >> -1n) & (this.p & this.whiteBoard)) !== 0n && (fromBit & SEVENTHRANK) !== 0n)
            if (((toBit >> 8n) & this.all()) === 0n) this.enPassantSq = SQUARES[SquareIndex[to] + 8];
        }
      }
    } else {
      if (color === 'w') {
        if ((toBit & this.blackBoard) !== 0n) {
          this.blackBoard &= ~toBit;
          this.halfMove = 0;
        }
      } else {
        if ((toBit & this.whiteBoard) !== 0n) {
          this.whiteBoard &= ~toBit;
          this.halfMove = 0;
        }
      }

      this.enPassantSq = '-';
    }

    const all = this.all();
    this.k &= all;
    this.q &= all;
    this.r &= all;
    this.b &= all;
    this.n &= all;
    this.p &= all;

    if ((this.k & fromBit) !== 0n) {
      if (color === 'w') {
        this.castlingRights['w'].k = false;
        this.castlingRights['w'].q = false;
      } else {
        this.castlingRights['b'].k = false;
        this.castlingRights['b'].q = false;
      }
      this.k |= toBit;
      this.k &= ~fromBit;
    } else if ((this.q & fromBit) !== 0n) {
      this.q |= toBit;
      this.q &= ~fromBit;
    } else if ((this.r & fromBit) !== 0n) {
      this.r |= toBit;
      this.r &= ~fromBit;
    } else if ((this.b & fromBit) !== 0n) {
      this.b |= toBit;
      this.b &= ~fromBit;
    } else if ((this.n & fromBit) !== 0n) {
      this.n |= toBit;
      this.n &= ~fromBit;
    } else if ((this.p & fromBit) !== 0n) {
      this.p &= ~fromBit;
      if ((toBit & (FIRSTRANK | EIGHTHRANK)) !== 0n) {
        this.q |= toBit;
      } else {
        this.p |= toBit;
      }
      this.halfMove = 0;
    }

    if (color === 'w') {
      this.whiteBoard &= ~fromBit;
      this.whiteBoard |= toBit;
    } else {
      this.blackBoard &= ~fromBit;
      this.blackBoard |= toBit;
    }

    this.generateLegalMoves();

    return true;
  }

  private generatePawnMoves(
    from: number,
    color: Color,
    whiteBoard: bigint = this.whiteBoard,
    blackBoard: bigint = this.blackBoard,
  ): bigint {
    let moves: bigint = 0n;
    const fromBit: bigint = 1n << BigInt(from);
    if (color === 'w') {
      moves |= (fromBit << 8n) & ~this.all();
      if ((fromBit & SECONDRANK) !== 0n) {
        moves |= (fromBit << 16n) & ~this.all();
      }

      if ((fromBit & FIFTHRANK) !== 0n) {
        if (((fromBit << 1n) & (this.p & blackBoard)) !== 0n)
          if (SQUARES[from + 9] === this.enPassantSq) moves |= fromBit << 9n;
        if (((fromBit << -1n) & (this.p & blackBoard)) !== 0n)
          if (SQUARES[from + 7] === this.enPassantSq) moves |= fromBit << 7n;
      }
    } else {
      moves |= (fromBit << -8n) & ~this.all();
      if ((fromBit & SEVENTHRANK) !== 0n) {
        moves |= (fromBit << -16n) & ~this.all();
      }

      if ((fromBit & FOURTHRANK) !== 0n) {
        if (((fromBit << 1n) & (this.p & whiteBoard)) !== 0n)
          if (SQUARES[from - 7] === this.enPassantSq) moves |= fromBit << -7n;
        if (((fromBit << -1n) & (this.p & whiteBoard)) !== 0n)
          if (SQUARES[from - 9] === this.enPassantSq) {
            moves |= fromBit << -9n;
          }
      }
    }
    return moves;
  }

  private generateAllPawnAttacks() {
    for (let i = 0; i < 64; i++) {
      const fromBit: bigint = 1n << BigInt(i);
      let whiteAttacks: bigint = 0n;
      let blackAttacks: bigint = 0n;

      if ((fromBit & HFILE) === 0n && (fromBit & EIGHTHRANK) === 0n) {
        whiteAttacks |= fromBit << 9n;
      }
      if ((fromBit & AFILE) === 0n && (fromBit & EIGHTHRANK) === 0n) {
        whiteAttacks |= fromBit << 7n;
      }

      this.pawnAttacks['w'][i] = whiteAttacks;

      if ((fromBit & HFILE) === 0n && (fromBit & FIRSTRANK) === 0n) {
        blackAttacks |= fromBit << -7n;
      }
      if ((fromBit & AFILE) === 0n && (fromBit & FIRSTRANK) === 0n) {
        blackAttacks |= fromBit << -9n;
      }

      this.pawnAttacks['b'][i] = blackAttacks;
    }
  }

  private generateAllKnightMoves(): void {
    /*
            0 0 0 0 0 0 0 0
            0 0 15 0 17 0 0 0
            0 6 0 0 0 10 0 0
            0 0 0 1 0 0 0 0
            0 -10 0 0 0 -6 0 0
            0 0 -17  0 -15 0 0
            0 0 0 0 0 0 0 0
            0 0 0 0 0 0 0 0
        */

    for (let i = 0; i < 64; i++) {
      let moves: bigint = 0n;
      const fromBit: bigint = 1n << BigInt(i);

      if ((fromBit & AFILE) === 0n && (fromBit & (SEVENTHRANK | EIGHTHRANK)) === 0n) moves |= fromBit << 15n;
      if ((fromBit & HFILE) === 0n && (fromBit & (FIRSTRANK | SECONDRANK)) === 0n) moves |= fromBit << -15n;

      if ((fromBit & AFILE) === 0n && (fromBit & (FIRSTRANK | SECONDRANK)) === 0n) moves |= fromBit << -17n;
      if ((fromBit & HFILE) === 0n && (fromBit & (SEVENTHRANK | EIGHTHRANK)) === 0n) moves |= fromBit << 17n;

      if ((fromBit & (GFILE | HFILE)) === 0n && (fromBit & EIGHTHRANK) === 0n) moves |= fromBit << 10n;
      if ((fromBit & (AFILE | BFILE)) === 0n && (fromBit & FIRSTRANK) === 0n) moves |= fromBit << -10n;

      if ((fromBit & (AFILE | BFILE)) === 0n && (fromBit & EIGHTHRANK) === 0n) moves |= fromBit << 6n;
      if ((fromBit & (GFILE | HFILE)) === 0n && (fromBit & FIRSTRANK) === 0n) moves |= fromBit << -6n;

      this.knightMoves[i] = moves;
    }
  }

  private generateAllKingMoves() {
    for (let i = 0; i < 64; i++) {
      let moves: bigint = 0n;
      const fromBit: bigint = 1n << BigInt(i);

      if ((fromBit & EIGHTHRANK) === 0n) moves |= fromBit << 8n;
      if ((fromBit & FIRSTRANK) === 0n) moves |= fromBit << -8n;

      if ((fromBit & HFILE) === 0n) moves |= fromBit << 1n;
      if ((fromBit & AFILE) === 0n) moves |= fromBit << -1n;

      if ((fromBit & HFILE) === 0n && (fromBit & EIGHTHRANK) === 0n) moves |= fromBit << 9n;
      if ((fromBit & AFILE) === 0n && (fromBit & EIGHTHRANK) === 0n) moves |= fromBit << 7n;

      if ((fromBit & HFILE) === 0n && (fromBit & FIRSTRANK) === 0n) moves |= fromBit << -7n;
      if ((fromBit & AFILE) === 0n && (fromBit & FIRSTRANK) === 0n) moves |= fromBit << -9n;

      this.kingMoves[i] = moves;
    }
  }

  private blackAttacks(whiteBoard: bigint = this.whiteBoard, blackBoard: bigint = this.blackBoard): bigint {
    let attackMask: bigint = 0n;
    for (let i = 0; i < 64; i++) {
      const color: Color = ((1n << BigInt(i)) & this.whiteBoard) !== 0n ? 'w' : 'b';
      if (color !== 'b') continue;
      if ((this.q & blackBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |=
          this.generateRookMoves(i, color, whiteBoard, blackBoard).attacks |
          this.generateBishopMoves(i, color, whiteBoard, blackBoard).attacks;
      } else if ((this.r & blackBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.generateRookMoves(i, color, whiteBoard, blackBoard).attacks;
      } else if ((this.b & blackBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.generateBishopMoves(i, color, whiteBoard, blackBoard).attacks;
      } else if ((this.p & blackBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.pawnAttacks[color][i];
      } else if ((this.n & blackBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.knightMoves[i];
      } else if ((this.k & blackBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.kingMoves[i];
      }
    }

    return attackMask;
  }

  private whiteAttacks(whiteBoard: bigint = this.whiteBoard, blackBoard: bigint = this.blackBoard): bigint {
    let attackMask: bigint = 0n;
    for (let i = 0; i < 64; i++) {
      const color: Color = ((1n << BigInt(i)) & this.whiteBoard) !== 0n ? 'w' : 'b';
      if (color !== 'w') continue;
      if ((this.q & whiteBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |=
          this.generateRookMoves(i, color, whiteBoard, blackBoard).attacks |
          this.generateBishopMoves(i, color, whiteBoard, blackBoard).attacks;
      } else if ((this.r & whiteBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.generateRookMoves(i, color, whiteBoard, blackBoard).attacks;
      } else if ((this.b & whiteBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.generateBishopMoves(i, color, whiteBoard, blackBoard).attacks;
      } else if ((this.p & whiteBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.pawnAttacks[color][i];
      } else if ((this.n & whiteBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.knightMoves[i];
      } else if ((this.k & whiteBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.kingMoves[i];
      }
    }

    return attackMask;
  }

  private generateRookMoves(
    from: number,
    color: Color,
    whiteBoard: bigint = this.whiteBoard,
    blackBoard: bigint = this.blackBoard,
  ): MoveAttackData {
    /*
            0 0 0 1 0 0 0 0
            0 0 0 1 0 0 0 0
            0 0 0 1 0 0 0 0
            1 1 1 x 1 1 1 1
            0 0 0 1 0 0 0 0
            0 0 0 1 0 0 0 0
            0 0 0 1 0 0 0 0
            0 0 0 1 0 0 0 0
        */
    let attacks: bigint = 0n;
    let moves: bigint = 0n;
    const fromBit: bigint = 1n << BigInt(from);
    const enemyBoard: bigint =
      color === 'w' ? blackBoard & ~(this.k & this.blackBoard) : whiteBoard & ~(this.k & this.whiteBoard);
    const allyBoard: bigint = color === 'w' ? whiteBoard : blackBoard;

    // right
    for (let i = 1; i < 8; i++) {
      // edge check
      if ((fromBit & HFILE) !== 0n) break;

      attacks |= fromBit << BigInt(i);
      moves |= (fromBit << BigInt(i)) & ~allyBoard;
      // checkcapture
      if (((fromBit << BigInt(i)) & (enemyBoard | HFILE)) !== 0n || ((fromBit << BigInt(i)) & allyBoard) !== 0n) break;
    }

    for (let i = 1; i < 8; i++) {
      // edge check
      if ((fromBit & AFILE) !== 0n) break;

      attacks |= fromBit << -BigInt(i);
      moves |= (fromBit << -BigInt(i)) & ~allyBoard;

      // checkcapture
      if (((fromBit << -BigInt(i)) & (enemyBoard | AFILE)) !== 0n || ((fromBit << -BigInt(i)) & allyBoard) !== 0n)
        break;
    }

    // up
    for (let i = 1; i < 8; i++) {
      // edge check
      if ((fromBit & EIGHTHRANK) !== 0n) break;

      attacks |= fromBit << BigInt(i * 8);
      moves |= (fromBit << BigInt(i * 8)) & ~allyBoard;
      // checkcapture
      if (
        ((fromBit << BigInt(i * 8)) & (enemyBoard | EIGHTHRANK)) !== 0n ||
        ((fromBit << BigInt(i * 8)) & allyBoard) !== 0n
      )
        break;
    }

    for (let i = 1; i < 8; i++) {
      // edge check
      if ((fromBit & FIRSTRANK) !== 0n) break;

      attacks |= fromBit << -BigInt(i * 8);
      moves |= (fromBit << -BigInt(i * 8)) & ~allyBoard;
      // checkcapture
      if (
        ((fromBit << -BigInt(i * 8)) & (enemyBoard | FIRSTRANK)) !== 0n ||
        ((fromBit << -BigInt(i * 8)) & allyBoard) !== 0n
      )
        break;
    }

    return { moves, attacks };
  }

  private generateBishopMoves(
    from: number,
    color: Color,
    whiteBoard: bigint = this.whiteBoard,
    blackBoard: bigint = this.blackBoard,
  ): MoveAttackData {
    /*
            1 0 0 0 0 0 1 0
            0 1 0 0 0 1 0 0
            0 0 1 0 1 0 0 0
            0 0 0 x 0 0 0 0
            0 0 1 0 1 0 0 0
            0 1 0 0 0 1 0 0
            1 0 0 0 0 0 1 0
            0 0 0 0 0 0 0 1
        */

    let moves: bigint = 0n;
    let attacks: bigint = 0n;
    const fromBit: bigint = 1n << BigInt(from);
    const enemyBoard: bigint =
      color === 'w' ? blackBoard & ~(this.k & this.blackBoard) : whiteBoard & ~(this.k & this.whiteBoard);
    const allyBoard: bigint = color === 'w' ? whiteBoard : blackBoard;

    // upright
    for (let i = 1; i < 8; i++) {
      // edge check
      if ((fromBit & (HFILE | EIGHTHRANK)) !== 0n) break;
      attacks |= fromBit << BigInt(i * 9);
      moves |= (fromBit << BigInt(i * 9)) & ~allyBoard;
      // checkcapture
      if (
        ((fromBit << BigInt(i * 9)) & (enemyBoard | HFILE | EIGHTHRANK)) !== 0n ||
        ((fromBit << BigInt(i * 9)) & allyBoard) !== 0n
      )
        break;
    }

    for (let i = 1; i < 8; i++) {
      // edge check
      if ((fromBit & (AFILE | FIRSTRANK)) !== 0n) break;

      attacks |= fromBit << -BigInt(i * 9);
      moves |= (fromBit << -BigInt(i * 9)) & ~allyBoard;

      // checkcapture
      if (
        ((fromBit << -BigInt(i * 9)) & (enemyBoard | AFILE | FIRSTRANK)) !== 0n ||
        ((fromBit << -BigInt(i * 9)) & allyBoard) !== 0n
      )
        break;
    }

    // up
    for (let i = 1; i < 8; i++) {
      // edge check
      if ((fromBit & (EIGHTHRANK | AFILE)) !== 0n) break;

      attacks |= fromBit << BigInt(i * 7);
      moves |= (fromBit << BigInt(i * 7)) & ~allyBoard;
      // checkcapture
      if (
        ((fromBit << BigInt(i * 7)) & (enemyBoard | EIGHTHRANK | AFILE)) !== 0n ||
        ((fromBit << BigInt(i * 7)) & allyBoard) !== 0n
      )
        break;
    }

    for (let i = 1; i < 8; i++) {
      // edge check
      if ((fromBit & (FIRSTRANK | HFILE)) !== 0n) break;

      attacks |= fromBit << -BigInt(i * 7);
      moves |= (fromBit << -BigInt(i * 7)) & ~allyBoard;
      // checkcapture
      if (
        ((fromBit << -BigInt(i * 7)) & (enemyBoard | FIRSTRANK | HFILE)) !== 0n ||
        ((fromBit << -BigInt(i * 7)) & allyBoard) !== 0n
      )
        break;
    }

    return { moves, attacks };
  }

  private isMoveValid(from: number, to: number, enPassant: boolean = false): boolean {
    const fromBit: bigint = 1n << BigInt(from);
    const toBit: bigint = 1n << BigInt(to);
    const color: Color = (fromBit & this.whiteBoard) !== 0n ? 'w' : 'b';

    return color === 'w'
      ? (this.blackAttacks(
          (this.whiteBoard & ~fromBit) | toBit,
          this.blackBoard & ~(enPassant ? toBit << -8n : toBit),
        ) &
          (this.k & this.whiteBoard)) ===
          0n
      : (this.whiteAttacks(this.whiteBoard & ~(enPassant ? toBit << 8n : toBit), (this.blackBoard & ~fromBit) | toBit) &
          (this.k & this.blackBoard)) ===
          0n;
  }

  public isInCheck(): boolean {
    return this.turn === 'w'
      ? (this.blackAttackMask & (this.k & this.whiteBoard)) !== 0n
      : (this.whiteAttackMask & (this.k & this.blackBoard)) !== 0n;
  }

  public isMate(): boolean {
    return (this.turn === 'w' ? this.whiteValidMoves === 0n : this.blackValidMoves === 0n) && this.isInCheck();
  }

  public isStalemate(): boolean {
    return (this.turn === 'w' ? this.whiteValidMoves === 0n : this.blackValidMoves === 0n) && !this.isInCheck();
  }

  private all(): bigint {
    return this.whiteBoard | this.blackBoard;
  }
}
