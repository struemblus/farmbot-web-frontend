import * as React from "react";

interface Props extends React.HTMLProps<HTMLImageElement> {
  src: string;
  fallback: string;
}

type State = Partial<{ needsFallback: boolean }>;
/** Like a normal `<img>`, but it has a `fallback` URL if the image does not
 * load*/
export class FallbackImg extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = { needsFallback: false };
  }

  computeSrc = () => {
    return this.state.needsFallback ? this.props.fallback : this.props.src;
  }

  handleError = () => this.setState({ needsFallback: true });

  handleSuccess = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Avoids endless feedback loop.
    if (e.currentTarget.src === this.props.fallback) {
      this.setState({ needsFallback: false });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.src !== this.props.src) {
      this.setState({ needsFallback: false });
    }
  }

  render() {
    if (this.state.needsFallback) {
      return <img {...this.props} src={this.props.fallback} />;
    } else {
      return <img {...this.props}
        onError={this.handleError}
        onLoad={this.handleSuccess}
        src={this.props.src} />;
    }
  }
}
