import * as React from "react";
import * as ReactDom from "react-dom";

/** テキストボックスのProps */
interface TextBoxProps {
  /** ラベル */
  label: string;
  /** 最大文字数 */
  maxNum: number;
}

/** テキストボックス */
class TextBox extends React.Component<TextBoxProps> {
  /**
   * @Override
   */
  render(): JSX.Element {
    return (
      <label>
        {this.props.label}：<input type="text" /> ({this.props.maxNum}文字まで)
      </label>
    );
  }
}

/** メイン */
class Main extends React.Component {
  /**
   * @Override
   */
  render(): JSX.Element {
    return (
      <div>
        <h1>Propsのテスト</h1>
        <TextBox label="テキストボックス1" maxNum={10} />
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
