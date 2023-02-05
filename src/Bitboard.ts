import { Square, SQUARES } from "./utils";

export class Bitboard {

    static isOccupied(board : bigint, square: number): boolean {
        return (board & (1n << BigInt(square))) !== 0n;
    }

    static toArray(board : bigint): number[] {
        const array = new Array(64);
        for (let i = 0; i < 64; i++) {
            array[i] = Number(Bitboard.isOccupied(board, i));
        }
        return array;
    }

    static combineBitboards(...bitboards: bigint[]):bigint {
        let combinedValue = 0n
        for (const bb of bitboards) {
          combinedValue |= bb
        }
        return combinedValue
    }

    static toSquares(bigint: bigint): Square[] {
        let squares: Square[] = [];
        let bit: bigint = 1n;
        for (let i = 0; i < 64; i++) {
          if ((bigint & bit) !== 0n) {
            squares.push(SQUARES[i]);
          }
          bit = bit << 1n;
        }
        return squares;
      }

}

