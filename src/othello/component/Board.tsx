import * as React from "react";
import { BoardService } from "../service/BoardService";
import { PieceValue } from "../service/PieceValue";
import { Row } from "./Row";

/**
 * Props
 */
interface BoardProps {

}

/**
 * State
 */
interface BoardState {
    /** ボード */
    board: Array<Array<PieceValue>>;
    /** 現在の色 */
    current: PieceValue;
}

/**
 * ボード
 */
export class Board extends React.Component<BoardProps, BoardState> {

    /** ボードサービス */
    private boardService: BoardService;

    constructor(props: BoardProps) {
        super(props);
        this.boardService = new BoardService();
        this.state = {
            board: this.boardService.get(),
            current: PieceValue.BLACK
        };
        this.onClick.bind(this);
    }

    /**
     * クリックのイベントハンドラ
     * @param x X座標
     * @param y Y座標
     */
    private onClick(x: number, y: number): void {
        const current: PieceValue = this.state.current === PieceValue.BLACK ? PieceValue.WHITE : PieceValue.BLACK;
        if (this.boardService.setPiece(this.state.current, x, y)) {
            this.setState({
                board: this.boardService.get(),
                current
            });
        }
    }

    /**
     * render
     */
    render(): JSX.Element {
        return (
            <table>
                <tbody>
                {this.state.board.map((values, index) => <Row y={index} values={values} onClick={this.onClick} />)}
                </tbody>
            </table>
        )
    }
}
