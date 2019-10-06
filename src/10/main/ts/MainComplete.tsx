import * as React from "react";
import * as ReactDom from "react-dom";

/** テキストボックスのProps */
interface TextBoxProps {
  /** ラベル */
  label: string;
  /** 最大文字数 */
  maxNum: number;
  /** テキストボックスがクリックされたときに実行される関数 */
  onTextClick(): void;
}

/** テキストボックス */
class TextBox extends React.Component<TextBoxProps> {
  /**
   * @Override
   */
  render(): JSX.Element {
    return (
      <label>
        {this.props.label}：<input type="text" onClick={() => this.props.onTextClick()} /> ({this.props.maxNum}文字まで)
      </label>
    );
  }
}

/** メイン */
class Main extends React.Component {
  /**
   * クリックされたテキストボックスのラベルをアラートする
   * @param label ラベル
   */
  private alertClickedLabel(label: string): void {
    alert(`${label}がクリックされました。`);
  }

  /**
   * @Override
   */
  render(): JSX.Element {
    return (
      <div>
        <h1>Propsのテスト</h1>
        <TextBox label="テキストボックス1" maxNum={10} onTextClick={() => this.alertClickedLabel("テキストボックス1")} /><br />
        <TextBox label="テキストボックス2" maxNum={20} onTextClick={() => this.alertClickedLabel("テキストボックス2")} />
      </div>
    );
  }
}

window.onload = () => {
  ReactDom.render(
    <Main />,
    document.getElementById("js-react")
  );
};
