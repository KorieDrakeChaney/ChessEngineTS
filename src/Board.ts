import {
  toSquares,
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
  MoveAttackData,
} from './utils';

export class Board {
  /**
   * Holds the move history
   *
   * @example
   * ```ts
   * const board = new Board();
   *
   * board.move('a2', 'a4');
   * board.move('a7', 'a6');
   * board.move('b1', 'c3');
   *
   * console.log(board.moveHistory);
   *
   * //->
   * // [
   * //  { from : 'a2', to : 'a4' },
   * //  { from : 'a7', to : 'a6' },
   * //  { from : 'b1', to : 'c3' },
   * // ]
   *
   * ```
   */
  public moveHistory: History = [];
  /**
   *
   * Holds the current color
   *
   * @example
   * ```ts
   *
   * import { Board } from 'chess-engine-ts'
   *
   * const board = new Board();
   *
   * console.log(board.turn);
   *
   * // -> w
   *
   * ```
   */
  public turn: Color = 'w';

  /**
   * @internal
   * Holds a record for pseudo legal moves at dependent square
   *
   * @example
   * ```ts
   *
   * import { Board , logBoard} from 'chess-engine-ts'
   *
   * const board = new Board();
   *
   * logBoard(board.moveList['b1']);
   *
   * // ->
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 1 0 1 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   *
   * ```
   */
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
  /**
   * @internal
   * Holds a record for legal moves at dependent square
   *
   * @example
   * ```ts
   *
   * import { Board, logBoard } from 'chess-engine-ts'
   *
   * const board = new Board('6R1/pR1B1KPk/n7/3p2b1/7p/N3P3/1Pp4r/8 w - - 0 1');
   *
   * logBoard(board.moveList['d7']);
   *
   * // ->
   * // 0 0 1 0 1 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 1 0 1 0 0 0
   * // 0 1 0 0 0 1 0 0
   * // 1 0 0 0 0 0 1 0
   * // 0 0 0 0 0 0 0 1
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   *
   * ```
   */
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

  /**
   * @internal
   * Holds a record for castling rights
   *
   * @example
   * ```ts
   *
   * import { Board } from 'chess-engine-ts'
   *
   * const board = new Board();
   *
   * // checks if king has the ability to castle king side
   * console.log(board.castlingRights['w'].k);
   *
   * // -> true
   *
   * ```
   */

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

  /**
   * @internal
   * Holds where each king is
   *
   * @remark
   * Updated every turn
   *
   * @example
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * logBoard(board.k);
   *
   * //->
   * // 0 0 0 0 1 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 1 0 0 0
   *
   * ```
   *
   * @group Piece Bitboards
   */
  k = 0n;
  /**
   * @internal
   * Holds where each queen is
   *
   * @remark
   * Updated every turn
   *
   * @example
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * logBoard(board.q);
   *
   * //->
   * // 0 0 0 1 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 1 0 0 0 0
   *
   * ```
   *
   * @group Piece Bitboards
   */
  q = 0n;
  /**
   * @internal
   * Holds where each rook is
   *
   * @remark
   * Updated every turn
   *
   * @example
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * logBoard(board.r);
   *
   * //->
   * // 1 0 0 0 0 0 0 1
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 1 0 0 0 0 0 0 1
   *
   * ```
   *
   * @group Piece Bitboards
   */
  r = 0n;
  /**
   * @internal
   * Holds where each bishop is
   *
   * @remark
   * Updated every turn
   *
   * @example
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * logBoard(board.b);
   *
   * //->
   * // 0 0 1 0 0 1 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 1 0 0 1 0 0
   *
   * ```
   *
   * @group Piece Bitboards
   */
  b = 0n;
  /**
   * @internal
   * Holds where each knight is
   *
   * @remark
   * Updated every turn
   *
   * @example
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * logBoard(board.n);
   *
   * //->
   * // 0 1 0 0 0 0 1 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 1 0 0 0 0 1 0
   *
   * ```
   *
   * @group Piece Bitboards
   */
  n = 0n;
  /**
   * @internal
   * Holds where each pawn is
   *
   * @remark
   * Updated every turn
   *
   * @example
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * logBoard(board.p);
   *
   * //->
   * // 0 0 0 0 0 0 0 0
   * // 1 1 1 1 1 1 1 1
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 1 1 1 1 1 1 1 1
   * // 0 0 0 0 0 0 0 0
   *
   * ```
   *
   * @group Piece Bitboards
   */
  p = 0n;

  /**
   * @internal
   * Holds where each white piece is
   *
   * @remark
   * Updated every turn
   *
   * @example
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * logBoard(board.whiteBoard);
   *
   * //->
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 1 1 1 1 1 1 1 1
   * // 1 1 1 1 1 1 1 1
   *
   * ```
   *
   * @group Color Bitboards
   */
  whiteBoard = 0n;
  /**
   * @internal
   * Holds where the black pieces are
   *
   * @remark
   * Updated every turn
   *
   * @example
   *
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * logBoard(board.blackBoard);
   *
   * //->
   * // 1 1 1 1 1 1 1 1
   * // 1 1 1 1 1 1 1 1
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   *
   * ```
   * @group Color Bitboards
   */
  blackBoard = 0n;

  /**
   * @internal
   * Holds all the attacks rays for the white pieces
   *
   * @remark
   * Updated every turn
   *
   * @example
   *
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * logBoard(board.whiteAttackMask);
   *
   * // ->
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 1 1 1 1 1 1 1 1
   * // 1 1 1 1 1 1 1 1
   * // 0 1 1 1 1 1 1 0
   *
   * ```
   *
   * @group Attack Masks Bitboard
   */
  whiteAttackMask = 0n;
  /**
   * @internal
   * Holds all the attacks rays for the black pieces
   *
   * @remark
   * Updated every turn
   *
   * @example
   *
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * logBoard(board.blackAttackMask);
   *
   * // ->
   * // 0 1 1 1 1 1 1 0
   * // 1 1 1 1 1 1 1 1
   * // 1 1 1 1 1 1 1 1
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   *
   * ```
   *
   * @group Attack Masks Bitboard
   */
  blackAttackMask = 0n;
  /**
   * @internal
   * Holds all the valids moves for the white pieces
   *
   * @remark
   * Updated every turn
   *
   * @example
   *
   * ``` ts
   *
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * logBoard(board.whiteValidMoves);
   *
   * // ->
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 1 1 1 1 1 1 1 1
   * // 1 1 1 1 1 1 1 1
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   *
   * ```
   * @group Valid Moves Bitboard
   */
  whiteValidMoves = 0n;
  /**
   * @internal
   * Holds all the valids moves for the black pieces
   *
   * @remark
   * Updated every turn
   *
   * @example
   *
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1');
   *
   * logBoard(board.blackValidMoves);
   *
   * // ->
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 1 1 1 1 1 1 1 1
   * // 1 1 1 1 1 1 1 1
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   *
   * ```
   *
   * @group Valid Moves Bitboard
   */
  blackValidMoves = 0n;

  /**
   * @internal
   * Holds all the capture squares for pawns
   *
   *
   * @remarks
   * pawn captures are updated after every move
   *
   * @example
   *
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board('6k1/1B2pp2/P2BP3/3ppPp1/3p4/8/4R2K/3n2r1 w - - 0 1');
   *
   * logBoard(board.pawnCaptures['w']);
   *
   * // ->
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 1 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   *
   * ```
   *
   * @group Pawn Captures Bitboard
   */
  pawnCaptures: Record<Color, bigint> = {
    w: 0n,
    b: 0n,
  };
  /**
   * @internal
   * A record that holds all knights moves dependent on which square it is on
   *
   * @remarks
   * NOTE : these moves are pseudo-legal moves
   *
   * @example
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   *
   * const board = new Board();
   * logBoard(board.knightMoves['b1']);
   *
   * // ->
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 1 0 1 0 0 0 0 0
   * // 0 0 0 1 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   *
   * ```
   * @group Piece Move Array
   */
  knightMoves: Record<Square, bigint> = {
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
  /**
   * @internal
   * A record that holds all king moves dependent on which square it is on
   *
   * @remarks
   * NOTE : these moves are pseudo-legal moves
   *
   * @example
   *
   * ```ts
   * import { Board,  logBoard } from './chess-engine-ts';
   *
   * const board = new Board();
   * logBoard(board.kingMoves['f5']);
   *
   * // ->
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 1 1 1 0
   * // 0 0 0 0 1 0 1 0
   * // 0 0 0 0 1 1 1 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   *
   * ```
   * @group Piece Move Array
   */
  kingMoves: Record<Square, bigint> = {
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
  /**
   * @internal
   * Pawn attacks
   *
   * @remarks
   * A record that holds two values `w` and `b` that holds all pawn attack rays dependent on square/color
   * @example
   *
   * ```ts
   * import { Board, logBoard } from './chess-engine-ts';
   *
   * const board = new Board();
   * logBoard(board.pawnAttacks['w']['f5']);
   *
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 1 0 1 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   *
   * ```
   * @group Piece Move Array
   */
  pawnAttacks: Record<Color, Record<Square, bigint>> = {
    w: {
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
    },
    b: {
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
    },
  };

  /**
   * Half moves
   *
   * @remarks
   * Holds how many moves have been played since the last capture or pawn moves
   *
   * @example
   * ```ts
   * import { Board } from 'chess-engine-ts'
   *
   * const board = new Board();
   *
   * board.move('b1', 'c3');
   *
   * console.log(board.halfMove);
   *
   * // -> 1
   * ```
   * @group Move variables
   */
  public halfMove: number = 0;
  /**
   * Full moves
   *
   * @remarks
   * Holds how many complete moves have been played
   *
   * @example
   * ```ts
   * import { Board } from 'chess-engine-ts'
   *
   * const board = new Board();
   *
   * board.move('a2', 'a3');
   * board.move('a7', 'a6');
   *
   * console.log(board.fullMove);
   *
   * // -> 2
   * ```
   * @group Move variables
   */
  public fullMove: number = 0;

  /**
   * En Passant Square
   *
   * @remarks
   * Holds the En Passant Square
   *
   * @group En Passant Square
   */
  public enPassantSq: Square | '-' = '-';

  constructor(fen = StartFEN) {
    this.loadFen(fen);
    this.generateAllKnightMoves();
    this.generateAllKingMoves();
    this.generateAllPawnAttacks();
    this.generateLegalMoves();
  }

  /**
   * Replaces current board for new FEN
   *
   * @param fen - FEN string
   *
   * @example
   * ```ts
   * import { Board } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * board.loadFen('rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq - 0 1')
   *
   * ```
   *
   */

  public loadFen(fen: string): void {
    const reg = /^-?[\d.]+(?:e-?\d+)?$/;
    const values = fen.replaceAll('/', ' ').split(' ');

    for (const [i, value] of values.entries()) {
      let offset = 0;
      for (let j = 0; j < value.length; j++) {
        const coords = 7 + 8 * (7 - i) - offset;
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

  /**
   * Returns the FEN of the current position
   *
   * @example
   * ```ts
   *
   * import { Board } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * board.move('a2', 'a4');
   *
   * console.log(board.exportFen());
   *
   * //-> rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq - 0 1
   *
   * ```
   */
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

  /**
   * Returns an array of elements consisting of piece data or empty squares(`undefined`)
   *
   *
   *  @example
   * ```ts
   * import { Board } from './chess-engine-ts';
   *
   * const board = new Board()
   *
   * console.log(board.overview())
   *
   * //->    [
   * //      {type: 'r', color: 'b', square: 'h8'},
   * //      {type: 'n', color: 'b', square: 'g8'},
   * //      {type: 'b', color: 'b', square: 'f8'},
   * //      {type: 'k', color: 'b', square: 'e8'},
   * //      {type: 'q', color: 'b', square: 'd8'},
   * //      {type: 'b', color: 'b', square: 'c8'},
   * //      {type: 'n', color: 'b', square: 'b8'},
   * //      {type: 'r', color: 'b', square: 'a8'},
   * //      ...
   * //      {type: 'r', color: 'w', square: 'h1'},
   * //      {type: 'n', color: 'w', square: 'g1'},
   * //      {type: 'b', color: 'w', square: 'f1'},
   * //      {type: 'q', color: 'w', square: 'e1'},
   * //      {type: 'k', color: 'w', square: 'd1'},
   * //      {type: 'n', color: 'w', square: 'c1'},
   * //      {type: 'n', color: 'w', square: 'b1'},
   * //      {type: 'r', color: 'w', square: 'a1'}]
   *
   * ```
   *
   */

  public overview(): (PieceData | undefined)[] {
    const pieces: (PieceData | undefined)[] = [];

    for (let i = 63; i >= 0; i--) {
      const coords = 1n << BigInt(i);
      const color: Color = (coords & this.whiteBoard) !== 0n ? 'w' : 'b';
      if ((this.k & coords) !== 0n) pieces.push({ type: 'k', color, square: SQUARES[i] });
      else if ((this.q & coords) !== 0n) pieces.push({ type: 'q', color, square: SQUARES[i] });
      else if ((this.r & coords) !== 0n) pieces.push({ type: 'r', color, square: SQUARES[i] });
      else if ((this.b & coords) !== 0n) pieces.push({ type: 'b', color, square: SQUARES[i] });
      else if ((this.n & coords) !== 0n) pieces.push({ type: 'n', color, square: SQUARES[i] });
      else if ((this.p & coords) !== 0n) pieces.push({ type: 'p', color, square: SQUARES[i] });
      else {
        pieces.push(undefined);
      }
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
        this.moveList[SQUARES[i]] = this.kingMoves[SQUARES[i]] & ~(color === 'w' ? this.whiteBoard : this.blackBoard);
      } else if ((this.q & (1n << BigInt(i))) !== 0n) {
        this.moveList[SQUARES[i]] = this.generateRookMoves(i, color).moves | this.generateBishopMoves(i, color).moves;
      } else if ((this.r & (1n << BigInt(i))) !== 0n) {
        this.moveList[SQUARES[i]] = this.generateRookMoves(i, color).moves;
      } else if ((this.b & (1n << BigInt(i))) !== 0n) {
        this.moveList[SQUARES[i]] = this.generateBishopMoves(i, color).moves;
      } else if ((this.n & (1n << BigInt(i))) !== 0n) {
        this.moveList[SQUARES[i]] = this.knightMoves[SQUARES[i]] & ~(color === 'w' ? this.whiteBoard : this.blackBoard);
      } else if ((this.p & (1n << BigInt(i))) !== 0n) {
        this.pawnCaptures[color] |=
          this.pawnAttacks[color][SQUARES[i]] & (color === 'w' ? this.blackBoard : this.whiteBoard);
        this.moveList[SQUARES[i]] = this.generatePawnMoves(i, color) | this.pawnCaptures[color];
      } else {
        this.moveList[SQUARES[i]] = 0n;
      }
    }

    this.whiteAttackMask = this.whiteAttacks();
    this.blackAttackMask = this.blackAttacks();

    if (this.castlingRights['w'].k && !this.isCheck()) {
      if ((wkCastlingMask & (this.blackAttackMask | this.whiteBoard)) === 0n) {
        this.moveList['e1'] |= (1n << BigInt(SquareIndex['e1'])) << -2n;
      }
    }

    if (this.castlingRights['w'].q && !this.isCheck()) {
      if ((wqCastlingMask & (this.blackAttackMask | this.whiteBoard)) === 0n) {
        this.moveList['e1'] |= (1n << BigInt(SquareIndex['e1'])) << 2n;
      }
    }

    if (this.castlingRights['b'].k && !this.isCheck()) {
      if ((bkCastlingMask & (this.whiteAttackMask | this.blackBoard)) === 0n) {
        this.moveList['e8'] |= (1n << BigInt(SquareIndex['e8'])) << -2n;
      }
    }

    if (this.castlingRights['b'].q && !this.isCheck()) {
      if ((bqCastlingMask & (this.whiteAttackMask | this.blackBoard)) === 0n) {
        this.moveList['e8'] |= (1n << BigInt(SquareIndex['e8'])) << 2n;
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
      const moves = toSquares(this.moveList[SQUARES[i]]);
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

  /**
   * Takes in one argument of type square, returns an array of valid moves of type `Square`(`a1` | `b1`, `c1` ... `f8` | `g8` | `h8`);
   * @example
   *
   * ```ts
   * import { Board } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * console.log(board.validMoves('a2'));
   *
   * //->[ 'a3', 'a4' ]
   *
   * ```
   *
   * @param square - Square
   *
   * @group Piece Moves
   */
  public validMoves(square: Square): Square[] {
    return toSquares(this.validMoveList[square]);
  }
  /**
   *
   * Takes two arguments, both are of type `Square` (`a1` | `b1`, `c1` ... `f8` | `g8` | `h8`);
   * whichs moves the piece from->to
   * if move is valid it will return `true`, else `false`.
   *
   *  @example
   * ```ts
   * import { Board } from './chess-engine-ts';
   *
   * const board = new Board();
   *
   * board.move('a2', 'a4'); // valid
   * ```
   *
   *  @param from - Square
   *
   *  @param to - Square
   *
   *
   *  @group Piece Moves
   */
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

    this.moveHistory.push({
      from,
      to,
    });

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
          if (SQUARES[from + 7] === this.enPassantSq) moves |= fromBit << 7n;
        if (((fromBit << -1n) & (this.p & blackBoard)) !== 0n)
          if (SQUARES[from + 9] === this.enPassantSq) moves |= fromBit << 9n;
      }
    } else {
      moves |= (fromBit << -8n) & ~this.all();
      if ((fromBit & SEVENTHRANK) !== 0n) {
        moves |= (fromBit << -16n) & ~this.all();
      }

      if ((fromBit & FOURTHRANK) !== 0n) {
        if (((fromBit << 1n) & (this.p & whiteBoard)) !== 0n)
          if (SQUARES[from - 9] === this.enPassantSq) moves |= fromBit << -9n;
        if (((fromBit << -1n) & (this.p & whiteBoard)) !== 0n)
          if (SQUARES[from - 7] === this.enPassantSq) moves |= fromBit << -7n;
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
        whiteAttacks |= fromBit << 7n;
      }
      if ((fromBit & AFILE) === 0n && (fromBit & EIGHTHRANK) === 0n) {
        whiteAttacks |= fromBit << 9n;
      }

      this.pawnAttacks['w'][SQUARES[i]] = whiteAttacks;

      if ((fromBit & HFILE) === 0n && (fromBit & FIRSTRANK) === 0n) {
        blackAttacks |= fromBit << -9n;
      }
      if ((fromBit & AFILE) === 0n && (fromBit & FIRSTRANK) === 0n) {
        blackAttacks |= fromBit << -7n;
      }

      this.pawnAttacks['b'][SQUARES[i]] = blackAttacks;
    }
  }

  private generateAllKnightMoves(): void {
    /*
            0 0 0 0 0 0 0 0
            0 0 17 0 15 0 0 0
            0 10 0 0 0 6 0 0
            0 0 0 1 0 0 0 0
            0 -6 0 0 0 -10 0 0
            0 0 -15  0 -17 0 0
            0 0 0 0 0 0 0 0
            0 0 0 0 0 0 0 0
        */

    for (let i = 0; i < 64; i++) {
      let moves: bigint = 0n;
      const fromBit: bigint = 1n << BigInt(i);

      if ((fromBit & AFILE) === 0n && (fromBit & (SEVENTHRANK | EIGHTHRANK)) === 0n) moves |= fromBit << 17n;
      if ((fromBit & HFILE) === 0n && (fromBit & (FIRSTRANK | SECONDRANK)) === 0n) moves |= fromBit << -17n;

      if ((fromBit & AFILE) === 0n && (fromBit & (FIRSTRANK | SECONDRANK)) === 0n) moves |= fromBit << -15n;
      if ((fromBit & HFILE) === 0n && (fromBit & (SEVENTHRANK | EIGHTHRANK)) === 0n) moves |= fromBit << 15n;

      if ((fromBit & (GFILE | HFILE)) === 0n && (fromBit & EIGHTHRANK) === 0n) moves |= fromBit << 6n;
      if ((fromBit & (AFILE | BFILE)) === 0n && (fromBit & FIRSTRANK) === 0n) moves |= fromBit << -6n;

      if ((fromBit & (AFILE | BFILE)) === 0n && (fromBit & EIGHTHRANK) === 0n) moves |= fromBit << 10n;
      if ((fromBit & (GFILE | HFILE)) === 0n && (fromBit & FIRSTRANK) === 0n) moves |= fromBit << -10n;

      this.knightMoves[SQUARES[i]] = moves;
    }
  }

  private generateAllKingMoves() {
    for (let i = 0; i < 64; i++) {
      let moves: bigint = 0n;
      const fromBit: bigint = 1n << BigInt(i);

      if ((fromBit & EIGHTHRANK) === 0n) moves |= fromBit << 8n;
      if ((fromBit & FIRSTRANK) === 0n) moves |= fromBit << -8n;

      if ((fromBit & AFILE) === 0n) moves |= fromBit << 1n;
      if ((fromBit & HFILE) === 0n) moves |= fromBit << -1n;

      if ((fromBit & (AFILE | EIGHTHRANK)) === 0n) moves |= fromBit << 9n;
      if ((fromBit & (HFILE | EIGHTHRANK)) === 0n) moves |= fromBit << 7n;

      if ((fromBit & (AFILE | FIRSTRANK)) === 0n) moves |= fromBit << -7n;
      if ((fromBit & (HFILE | FIRSTRANK)) === 0n) moves |= fromBit << -9n;

      this.kingMoves[SQUARES[i]] = moves;
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
        attackMask |= this.pawnAttacks[color][SQUARES[i]];
      } else if ((this.n & blackBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.knightMoves[SQUARES[i]];
      } else if ((this.k & blackBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.kingMoves[SQUARES[i]];
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
        attackMask |= this.pawnAttacks[color][SQUARES[i]];
      } else if ((this.n & whiteBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.knightMoves[SQUARES[i]];
      } else if ((this.k & whiteBoard & (1n << BigInt(i))) !== 0n) {
        attackMask |= this.kingMoves[SQUARES[i]];
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

    // left
    for (let i = 1; i < 8; i++) {
      // edge check
      if ((fromBit & AFILE) !== 0n) break;

      attacks |= fromBit << BigInt(i);
      moves |= (fromBit << BigInt(i)) & ~allyBoard;
      // checkcapture
      if (((fromBit << BigInt(i)) & (enemyBoard | AFILE)) !== 0n || ((fromBit << BigInt(i)) & allyBoard) !== 0n) break;
    }

    for (let i = 1; i < 8; i++) {
      // edge check
      if ((fromBit & HFILE) !== 0n) break;

      attacks |= fromBit << -BigInt(i);
      moves |= (fromBit << -BigInt(i)) & ~allyBoard;

      // checkcapture
      if (((fromBit << -BigInt(i)) & (enemyBoard | HFILE)) !== 0n || ((fromBit << -BigInt(i)) & allyBoard) !== 0n)
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
      attacks |= fromBit << BigInt(i * 7);
      moves |= (fromBit << BigInt(i * 7)) & ~allyBoard;
      // checkcapture
      if (
        ((fromBit << BigInt(i * 7)) & (enemyBoard | HFILE | EIGHTHRANK)) !== 0n ||
        ((fromBit << BigInt(i * 7)) & allyBoard) !== 0n
      )
        break;
    }

    for (let i = 1; i < 8; i++) {
      // edge check
      if ((fromBit & (AFILE | FIRSTRANK)) !== 0n) break;

      attacks |= fromBit << -BigInt(i * 7);
      moves |= (fromBit << -BigInt(i * 7)) & ~allyBoard;

      // checkcapture
      if (
        ((fromBit << -BigInt(i * 7)) & (enemyBoard | AFILE | FIRSTRANK)) !== 0n ||
        ((fromBit << -BigInt(i * 7)) & allyBoard) !== 0n
      )
        break;
    }

    // up
    for (let i = 1; i < 8; i++) {
      // edge check
      if ((fromBit & (EIGHTHRANK | AFILE)) !== 0n) break;

      attacks |= fromBit << BigInt(i * 9);
      moves |= (fromBit << BigInt(i * 9)) & ~allyBoard;
      // checkcapture
      if (
        ((fromBit << BigInt(i * 9)) & (enemyBoard | EIGHTHRANK | AFILE)) !== 0n ||
        ((fromBit << BigInt(i * 9)) & allyBoard) !== 0n
      )
        break;
    }

    for (let i = 1; i < 8; i++) {
      // edge check
      if ((fromBit & (FIRSTRANK | HFILE)) !== 0n) break;

      attacks |= fromBit << -BigInt(i * 9);
      moves |= (fromBit << -BigInt(i * 9)) & ~allyBoard;
      // checkcapture
      if (
        ((fromBit << -BigInt(i * 9)) & (enemyBoard | FIRSTRANK | HFILE)) !== 0n ||
        ((fromBit << -BigInt(i * 9)) & allyBoard) !== 0n
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

  /**
   * Returns if current color is in check
   *
   *  @example
   * ```ts
   * import { Board } from './chess-engine-ts';
   *
   * const board = new Board('3b1q1q/1N2PRQ1/rR3KBr/B4PP1/2Pk1r1b/1P2P1N1/2P2P2/8 b - -');
   *
   * console.log(board.isCheck());
   *
   * //-> true
   * ```
   *
   *  @group Board State
   */
  public isCheck(): boolean {
    return this.turn === 'w'
      ? (this.blackAttackMask & (this.k & this.whiteBoard)) !== 0n
      : (this.whiteAttackMask & (this.k & this.blackBoard)) !== 0n;
  }
  /**
   * Returns if current color is mated
   *
   * Similar to {@link isStalemate}, but returns true if is in check and no valid moves
   *
   *  @example
   * ```ts
   * import { Board } from './chess-engine-ts';
   *
   * const board = new Board('3b1q1q/1N2PRQ1/rR3KBr/B4PP1/2Pk1r1b/1P2P1N1/2P2P2/8 b - -');
   *
   * console.log(board.isMate());
   *
   * //-> true
   * ```
   *
   *  @group Board State
   */
  public isMate(): boolean {
    return (this.turn === 'w' ? this.whiteValidMoves === 0n : this.blackValidMoves === 0n) && this.isCheck();
  }

  /**
   * Returns if current color is stalemated
   *
   *
   * Similar to {@link isMate}, but returns true if not in check and no valid moves
   *
   *  @example
   * ```ts
   * import { Board } from './chess-engine-ts';
   *
   * const board = new Board('8/6p1/5p2/5k1K/7P/8/8/8 w - - -');
   *
   * console.log(board.isStalemate());
   *
   * //-> true
   * ```
   *  @group Board State
   */
  public isStalemate(): boolean {
    return (this.turn === 'w' ? this.whiteValidMoves === 0n : this.blackValidMoves === 0n) && !this.isCheck();
  }

  /**
   * Combines both whiteBoard and blackBoard and returns full board
   *
   * @example
   * ```ts
   * import { Board, logBoard } from 'chess-engine-ts';
   *
   * const board = new Board();
   *
   * logBoard(board.all());
   *
   * //->
   * // 1 1 1 1 1 1 1 1
   * // 1 1 1 1 1 1 1 1
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 0 0 0 0 0 0 0 0
   * // 1 1 1 1 1 1 1 1
   * // 1 1 1 1 1 1 1 1
   * ```
   *
   * @group Color Bitboards
   *
   */
  public all(): bigint {
    return this.whiteBoard | this.blackBoard;
  }
}
