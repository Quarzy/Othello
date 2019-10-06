import * as React from "react";
import { PieceValue } from "../service/PieceValue";

/**
 * Props
 */
interface PieceProps {
    /** 値 */
    value: PieceValue;
    /** X座標 */
    x: number;
    /** クリックのイベントハンドラ */
    onClick(x: number): void;
}

/**
 * コマ
 */
export class Piece extends React.Component<PieceProps> {

    /**
     * 値
     * @return 値
     */
    private value(): JSX.Element {
        switch (this.props.value) {
            case PieceValue.EMPTY:
                return <button onClick={() => this.props.onClick(this.props.x)}>＿</button>;
            case PieceValue.BLACK:
                return <span>●</span>;
            case PieceValue.WHITE:
                return <span>○</span>;
            default:
                throw new Error();
        }
    }

    /**
     * render
     */
    render(): JSX.Element {
        return <td>{this.value()}</td>;
    }
}
