import { Board } from './Board';

export * from './Board';
export * from './Bitboard';
export * from './utils';


const board = new Board();

console.log(board.overview());