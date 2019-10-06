import * as React from "react";
import * as ReactDom from "react-dom";

/** メイン */
class Main extends React.Component {
  /**
   * @Override
   */
  render(): JSX.Element {
    return (
      <div>
        <h1>セレクトボックス</h1>
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
