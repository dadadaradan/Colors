import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import chroma from "chroma-js";
import breakpoints from "./breakpoints";

const styles = {
  ColorBox: {
    width: "20%",
    height: (props) => (props.isMultiColor ? "25%" : "50%"),
    margin: "0 auto",
    position: "relative",
    cursor: "pointer",
    display: "inline-block",
    marginTop: "-5px",
    backgroundColor: (props) => props.background,
    "&:hover button": {
      opacity: "1",
    },
    [breakpoints.down("md")]: {
      width: "25%",
      height: (props) => (props.isMultiColor ? "20%" : "33.3333%"),
    },
    [breakpoints.down("sm")]: {
      width: "50%",
      height: (props) => (props.isMultiColor ? "10%" : "20%"),
    },
    [breakpoints.down("xs")]: {
      width: "100%",
      height: (props) => (props.isMultiColor ? "5%" : "10%"),
    },
  },
  buttonCopy: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    border: "none",
    textTransform: "uppercase",
    color: (props) =>
      chroma(props.background).luminance() > 0.5
        ? "rgba(0,0,0, 0.7)"
        : "#f2f2f2",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: "0.3rem 0.6rem",
    opacity: "0",
    transition: "0.5s",
  },
  boxContent: {
    display: "inline-block",
    position: "absolute",
    left: "0",
    bottom: "0",
    color: (props) =>
      chroma(props.background).luminance() > 0.5
        ? "rgba(0,0,0, 0.7)"
        : "#f2f2f2",
    letterSpacing: "1px",
    textTransform: "uppercase",
    padding: "10px",
    fontSize: "11px",
  },
  buttonMore: {
    display: "inline-block",
    position: "absolute",
    bottom: "0",
    right: "0",
    textTransform: "uppercase",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: (props) =>
      chroma(props.background).luminance() > 0.5
        ? "rgba(0,0,0, 0.7)"
        : "#f2f2f2",
    padding: "5px 9px",
    fontSize: "13px",
    textAlign: "center",
  },

  boxOverlay: {
    height: "100%",
    width: "100%",
    opacity: "0",
    zIndex: "0",
    transform: "scale(0.1)",
    visibility: "hidden",
    transition: "transform 0.5s ease-in-out",
  },
  show: {
    position: "absolute",
    opacity: "1",
    zIndex: "10",
    visibility: "visible",
    transform: "scale(50)",
  },
  copyText: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "11",
    flexDirection: "column",
    opacity: "0",
    visibility: "hidden",
    transition: "all 0.3s ease-in-out",
    "& h2": {
      marginBottom: "0",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      width: "100%",
      textAlign: "center",
      fontSize: "3.5rem",
      padding: "0.5rem",
      fontWeight: "400",
      textTransform: "uppercase",
      color: (props) =>
        chroma(props.background).luminance() > 0.5
          ? "rgba(0,0,0, 0.7)"
          : "#f2f2f2",
    },
    "& p": {
      fontSize: "2rem",
      color: (props) =>
        chroma(props.background).luminance() > 0.5
          ? "rgba(0,0,0, 0.7)"
          : "#f2f2f2",
      fontWeight: "300",
    },
  },
  showText: {
    opacity: "1",
    visibility: "visible",
  },
};

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCopied: false,
    };
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({ isCopied: true }, () => {
      setTimeout(() => this.setState({ isCopied: false }), 1500);
    });
  }

  render() {
    const { isMultiColor } = this.props;
    const { background, name, urlPath, classes } = this.props;
    const { isCopied } = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div
          className={classes.ColorBox}
          style={{ backgroundColor: background }}
        >
          <div
            className={`${classes.boxOverlay} ${isCopied && classes.show}`}
            style={{ background }}
          />
          <div
            className={`${classes.copyText} ${isCopied && classes.showText}`}
          >
            <h2>copied !</h2>
            <p>{background}</p>
          </div>
          <button className={classes.buttonCopy}>Copy</button>
          {isMultiColor && (
            <Link to={urlPath} onClick={(e) => e.stopPropagation()}>
              <span className={classes.buttonMore}>MORE</span>
            </Link>
          )}
          <span className={classes.boxContent}>{name}</span>
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
