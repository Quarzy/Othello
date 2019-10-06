import { PieceValue } from "./PieceValue";

/** サイズ */
const SIZE: number = 8;

/**
 * ボードサービス
 */
export class BoardService {

    /** ボード */
    private readonly board: Array<Array<PieceValue>>;

    constructor() {
        this.board = [];
        for (let i: number = 0; i < SIZE; i++) {
            const col: Array<PieceValue> = [];
            for (let j: number = 0; j < SIZE; j++) {
                col.push(PieceValue.EMPTY);
            }
            this.board.push(col);
        }
        this.board[3][3] = PieceValue.BLACK;
        this.board[3][4] = PieceValue.WHITE;
        this.board[4][3] = PieceValue.WHITE;
        this.board[4][4] = PieceValue.BLACK;
    }

    /**
     * ボードを返却する。
     * @return ボード
     */
    get(): Array<Array<PieceValue>> {
        return this.board;
    }

    /**
     * コマを配置する。
     * @param piece コマ
     * @param x X座標
     * @param y Y座標
     * @return コマを配置できた場合true
     */
    setPiece(piece: PieceValue, x: number, y: number): boolean {
        if (piece === PieceValue.EMPTY || x < 0 || x >= SIZE || y < 0 || y >= SIZE) {
            throw new Error();
        }
        if (this.board[y][x] !== PieceValue.EMPTY) {
            return false;
        }
        const trySet: (
            check: (tmpX: number, tmpY: number) => boolean,
            change: (tmpX: number, tmpY: number) => [number, number]) => boolean = this.trySet(piece, x, y);
        return trySet((tmpX, tmpY) => tmpY >= 0, (tmpX, tmpY) => [tmpX, tmpY - 1])
            || trySet((tmpX, tmpY) => tmpX < SIZE && tmpY >= 0, (tmpX, tmpY) => [tmpX + 1, tmpY - 1])
            || trySet((tmpX, tmpY) => tmpX < SIZE, (tmpX, tmpY) => [tmpX + 1, tmpY])
            || trySet((tmpX, tmpY) => tmpX < SIZE && tmpY < SIZE, (tmpX, tmpY) => [tmpX + 1, tmpY + 1])
            || trySet((tmpX, tmpY) => tmpY < SIZE, (tmpX, tmpY) => [tmpX, tmpY + 1])
            || trySet((tmpX, tmpY) => tmpX >= 0 && tmpY < SIZE, (tmpX, tmpY) => [tmpX - 1, tmpY + 1])
            || trySet((tmpX, tmpY) => tmpX >= 0, (tmpX, tmpY) => [tmpX - 1, tmpY])
            || trySet((tmpX, tmpY) => tmpX >= 0 && tmpY >= 0, (tmpX, tmpY) => [tmpX - 1, tmpY - 1]);
    }

    // private trySetN(piece: Piece, x: number, y: number): boolean {
    //     trySet()
    //     const check: (tmpX: number, tmpY: number) => boolean = (tmpX, tmpY) => tmpY >= 0;
    //     const change: (tmpX: number, tmpY: number) => [number, number] = (tmpX, tmpY) => [tmpX, tmpY - 1];
    //     if (this.isSettableDirection(piece, () => [x, y - 1], check, change)) {
    //         this.changeBoard(piece, x, y, check, change);
    //         return true;
    //     }
    //     return false;
    // }
    //
    // /**
    //  * コマの設置を試みる。
    //  * @param piece コマ
    //  * @param x X座標
    //  * @param y Y座標
    //  * @param init 仮座標初期化
    //  * @param check ループ判定
    //  * @param change ループごとの値変更
    //  * @return 設置可能ならtrue
    //  */
    // private trySet(piece: Piece, x: number, y: number,
    //                init: () => [number, number],
    //                check: (tmpX: number, tmpY: number) => boolean,
    //                change: (tmpX: number, tmpY: number) => [number, number]): boolean {
    //     if (this.isSettableDirection(piece, init, check, change)) {
    //         this.changeBoard(piece, x, y, check, change);
    //         return true;
    //     }
    //     return false;
    // }

    /**
     * コマの設置を試みる関数を返却する。
     * @param piece コマ
     * @param x X座標
     * @param y Y座標
     * @return 関数
     */
    private trySet(piece: PieceValue, x: number, y: number):
        (check: (tmpX: number, tmpY: number) => boolean,
         change: (tmpX: number, tmpY: number) => [number, number]) => boolean {
        return (check, change) => {
            if (this.isSettableDirection(piece, x, y, check, change)) {
                this.changeBoard(piece, x, y, check, change);
                return true;
            }
            return false;
        };
    }

    /**
     * 設置可能か。
     * @param piece コマ
     * @param x X座標
     * @param y Y座標
     * @param check ループ判定
     * @param change ループごとの値変更
     * @return 設置可能ならtrue
     */
    private isSettableDirection(piece: PieceValue, x: number, y: number,
                                check: (tmpX: number, tmpY: number) => boolean,
                                change: (tmpX: number, tmpY: number) => [number, number]): boolean {
        let [tmpX, tmpY] = change(x, y);
        let settable: boolean = false;
        while (check(tmpX, tmpY)) {
            const tmpPiece: PieceValue = this.board[tmpY][tmpX];
            if (tmpPiece === PieceValue.EMPTY) {
                return false;
            } else if (piece === tmpPiece) {
                return settable;
            } else {
                settable = true;
                [tmpX, tmpY] = change(tmpX, tmpY);
            }
        }
        return false;
    }

    /**
     * ボードにコマを設置する。
     * @param piece コマ
     * @param x X座標
     * @param y Y座標
     * @param check ループ判定
     * @param change ループごとの値変更
     */
    private changeBoard(piece: PieceValue, x: number, y: number,
                        check: (tmpX: number, tmpY: number) => boolean,
                        change: (tmpX: number, tmpY: number) => [number, number]): void {
        let [tmpX, tmpY] = [x, y];
        while (check(tmpX, tmpY)) {
            this.board[tmpY][tmpX] = piece;
            [tmpX, tmpY] = change(tmpX, tmpY);
        }
    }
}
