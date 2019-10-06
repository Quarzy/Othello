import * as React from "react";
import { PieceValue } from "../service/PieceValue";
import { Piece } from "./Piece";

/**
 * Props
 */
interface RowProps {
    /** Y座標 */
    y: number;
    /** 値リスト */
    values: Array<PieceValue>;
    /** クリックのイベントハンドラ */
    onClick(x: number, y: number): void;
}

/**
 * 行
 */
export class Row extends React.Component<RowProps> {

    /**
     * render
     */
    render(): JSX.Element {
        return (
            <tr>
                {
                    this.props
                        .values
                        .map((value, index) =>
                            <Piece value={value} x={index} onClick={x => this.props.onClick(x, this.props.y)} />
                            )
                }
            </tr>
        );
    }
}
