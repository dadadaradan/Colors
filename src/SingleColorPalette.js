import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import breakpoints from "./breakpoints";

const styles = {
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  PaletteColors: {
    height: "90%",
    overflow: "hidden",
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    position: "relative",
    cursor: "pointer",
    display: "inline-block",
    marginTop: "-5px",
    backgroundColor: "#222",
    [breakpoints.down("md")]: {
      width: "25%",
      height: "33.3333%",
    },
    [breakpoints.down("sm")]: {
      width: "50%",
      height: "20%",
    },
    [breakpoints.down("xs")]: {
      width: "100%",
      height: "10%",
    },
  },

  buttonGoBack: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    border: "none",
    textTransform: "uppercase",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "#f2f2f2",
    padding: "0.3rem 0.6rem",
    opacity: "1",
    textDecoration: "none",
    fontFamily: "Roboto,",
    fontSize: "0.9rem",
  },
};

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
    };
    this._shades = this.gatherColors(this.props.palette, this.props.color);
    this.changeFormat = this.changeFormat.bind(this);
  }

  gatherColors(palette, color) {
    const { colors } = palette;
    let shades = [];

    for (let key in colors) {
      shades = shades.concat(colors[key].filter((col) => col.id === color));
    }

    return shades.slice(1);
  }

  changeFormat(val) {
    this.setState({ format: val });
  }

  render() {
    const { classes } = this.props;
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;

    const colorBoxes = this._shades.map((color) => {
      return (
        <ColorBox
          key={color.name}
          name={color.name}
          background={color[format]}
          isMultiColor={false}
        />
      );
    });
    return (
      <div className={classes.Palette}>
        <Navbar isMultiColor={false} changeFormat={this.changeFormat} />
        <div className={classes.PaletteColors}>
          {colorBoxes}
          <Link to={`/palette/${id}`}>
            <div className={classes.goBack}>
              <button className={classes.buttonGoBack}>Go Back!</button>
            </div>
          </Link>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
