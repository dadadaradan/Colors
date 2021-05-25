import React, { Component } from "react";
import SeedColors from "./SeedColors";
import Palette from "./Palette";
import { generatePalette } from "./ColorHelpers";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: JSON.parse(localStorage.getItem("palettes")) || SeedColors,
    };
    this.findPalette = this.findPalette.bind(this);
    this.createNewPalette = this.createNewPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  createNewPalette(palette) {
    this.setState({ palettes: [...this.state.palettes, palette] }, () => {
      localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
    });
  }

  deletePalette(id) {
    const newPalettes = this.state.palettes.filter((palette) => {
      return palette.id !== id;
    });
    this.setState({ palettes: newPalettes }, () => {
      localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
    });
  }

  findPalette(id) {
    return this.state.palettes.find((palette) => {
      return palette.id === id;
    });
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPaletteForm
              handleSubmit={this.createNewPalette}
              {...routeProps}
              palettes={this.state.palettes}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList
              palettes={this.state.palettes}
              {...routeProps}
              deletePalette={this.deletePalette}
            />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              color={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
