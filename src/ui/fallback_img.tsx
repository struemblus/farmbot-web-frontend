import * as React from "react";
import { defensiveClone } from "../util";
type ImgTag = React.HTMLProps<HTMLImageElement>;
interface Props extends ImgTag {
  src: string;
  fallback: string;
}

type State = Partial<{ needsFallback: boolean }>;
/** Like a normal `<img>`, but it has a `fallback` URL if the image does not
 * load*/
export class FallbackImg extends React.Component<Props, State> {
  get imgProps() {
    let imProps: ImgTag = defensiveClone(this.props);
    // React will complain at runtime if <img/> has extra props.
    // Typescript will compile at compile if I don't use `any` here:
    delete (imProps as any).fallback;
    return imProps;
  }
  constructor() {
    super();
    this.state = { needsFallback: false };
  }

  componentWillReceiveProps(next: Props) {
    // Sorry. The webcam page needs live updates. <img/> tag was acting wonky.
    (next.src !== this.props.src) && this.setState({ needsFallback: false });
  }

  fallback = () => <img {...this.imgProps} src={this.props.fallback} />;

  dontFallback = () => {
    return <img {...this.imgProps}
      onError={() => this.setState({ needsFallback: true })}
      src={this.props.src} />;
  }

  render() {
    return ((this.state.needsFallback) ? this.fallback : this.dontFallback)();
  }
}
