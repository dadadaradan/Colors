import "rc-slider/assets/index.css";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import Slider from "rc-slider";
import { Select, MenuItem } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { withStyles } from "@material-ui/core";
import breakpoints from "./breakpoints";

const styles = {
  Navbar: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "6vh",
  },
  NavbarLink: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #d7f1f3",
    padding: "0 0.8rem",
    "& a": {
      textDecoration: "none",
      fontSize: "1.2rem",
      color: "black",
      marginBottom: "3px",
    },
    [breakpoints.down("xs")]: {
      display: (props) => (props.isMultiColor ? "none" : "flex"),
    },
  },

  SliderContainer: {
    padding: "0 1rem",
    borderRight: "1px solid #d7f1f3",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },

  spanLevel: {
    [breakpoints.down("sm")]: {
      display: "none",
    },
  },

  Slider: {
    width: "350px",
    display: "inline-block",
    marginLeft: "1rem",
    "& .rc-slider-track": {
      backgroundColor: "transparent",
    },
    "& .rc-slider-rail": {
      backgroundColor: "#c7e1e3",
    },
    "& .rc-slider-handle": {
      color: "#7f99a9",
    },
    [breakpoints.down("md")]: {
      width: "150px",
    },
  },

  selectContainer: {
    marginLeft: "auto",
    width: "260px",
    borderLeft: "1px solid #d7f1f3",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "0 1rem",
  },
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  closeSnackbar() {
    this.setState({ open: false });
  }

  handleChange(evt) {
    this.setState({ format: evt.target.value, open: true }, () => {
      this.props.changeFormat(this.state.format);
    });

    // this.props.changeFormat(evt.target.value);
  }
  render() {
    const { level, changeLevel, isMultiColor, classes } = this.props;
    return (
      <header className={classes.Navbar}>
        <div className={classes.NavbarLink}>
          <Link to="/">ReactColorApp</Link>
        </div>
        {isMultiColor && (
          <div className={classes.SliderContainer}>
            <span className={classes.spanLevel}>Level: {level}</span>
            <div className={classes.Slider}>
              <Slider
                defaultValue={level}
                step={100}
                min={100}
                max={900}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={this.state.format} onChange={this.handleChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          onClose={this.closeSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={2000}
          message={
            <span>Format Changed To {this.state.format.toUpperCase()}</span>
          }
        />
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
