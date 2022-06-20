import React, { Component } from "react";
import { Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import ReactJson from "react-json-view";
import { Canvas, core, Palette, Preview, registerPaletteElements, state, Trash } from "react-page-maker";

import { unicID } from "@/functions/index";
import { elements } from "./const";
import DraggableTextbox from "./elements/DraggableTextbox";
import DraggableLayout from "./elements/DraggableLayout";
import DraggableDropdown from "./elements/DraggableDropdown";
import DraggableSlider from "./elements/DraggableSlider";
import DraggableTitle from "./elements/DraggableTitle";

import "./App.css";

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    // register all palette elements
    registerPaletteElements([{
      type: elements.TEXTBOX,
      component: DraggableTextbox
    }, {
      type: elements.DROPDOWN,
      component: DraggableDropdown
    }, {
      type: elements.GRID_LAYOUT,
      component: DraggableLayout
    }, {
      type: elements.SLIDER,
      component: DraggableSlider
    }, {
      type: elements.HEADER,
      component: DraggableTitle
    }]);

    // state.clearState() triggers this event
    state.addEventListener("flush", (e) => {
      console.log("flush", e);
    });

    // state.removeElement() triggers this event
    state.addEventListener("removeElement", (e) => {
      console.log("removeElement", e);
    });

    // state.updateElement() triggers this event
    state.addEventListener("updateElement", (e) => {
      console.log("updateElement", e);
    });
  }

  state = {
    activeTab: "1",
    currentState: []
  };

  componentWillMount() {
    state.addEventListener("change", this._stateChange);
  }

  componentWillUnmount() {
    state.removeEventListener("change", this._stateChange);
  }

  _stateChange = (s) => {
    const newState = state.getStorableState();
    this.setState({ currentState: newState }, () => {
      localStorage.setItem("initialElements", JSON.stringify(newState));
    });
  };

  // re-hydrate canvas state
  initialElements = JSON.parse(localStorage.getItem("initialElements"));

  // define all palette elements that you want to show
  paletteItemsToBeRendered = [{
    type: elements.TEXTBOX,
    name: "Text Field",
    id: "f1",
    payload: { // initial data
      fname: "Manish",
      lname: "Keer"
    }
  }, {
    type: elements.DROPDOWN,
    name: "Dropdown Field",
    id: "f2"
  }, {
    type: elements.SLIDER,
    name: "Slider",
    id: "s1"
  }, {
    type: elements.HEADER,
    name: "Title",
    id: "h1"
  }, {
    type: elements.GRID_LAYOUT_3_3,
    name: "3 by 3 Grid Layout",
    id: "3-3-grid"
  }, {
    type: elements.GRID_LAYOUT_1_2,
    name: "1 by 2 Grid Layout",
    id: "1-2-grid"
  }, {
    type: elements.GRID_LAYOUT,
    payload: {
      countOfRows: 1,
      countOfCols: 3
    },
    name: "Grid Layout",
    id: "main-grid"
  }];

  _onDrop = (data, cb = () => {
  }) => {
    // no need to ask id and name again
    if (data.payload && data.payload.dropped) {
      return cb(data);
    }

    let name = data.name;

    if (data.type === elements.TEXTBOX || data.type === elements.DROPDOWN) {
      name = "name";
    }

    // const id = window.prompt('Please enter unique ID');
    const id = unicID();

    const result = cb({
      ...data,
      name,
      id,
      payload: { dropped: true }
    });
  };

  _toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  _clearState = () => {
    state.clearState();
  };

  render() {
    return (
      <div className="width100">
        <Nav tabs className="justify-content-md-center">
          <NavItem>
            <NavLink
              className={`${this.state.activeTab === "1" ? "active" : ""}`}
              onClick={() => {
                this._toggleTab("1");
              }}
            >
              Canvas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${this.state.activeTab === "2" ? "active" : ""}`}
              onClick={() => {
                this._toggleTab("2");
              }}
            >
              Preview
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${this.state.activeTab === "3" ? "active" : ""}`}
              onClick={() => {
                this._toggleTab("3");
              }}
            >
              JSON
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          {this.state.activeTab==1 && <TabPane tabId="1">
            <Row className="page-builder mt-3">
              <Col sm="9" className="canvas-container">
                <Canvas onClick={(e)=>console.log('e',e)} onDrop={this._onDrop} initialElements={this.initialElements} placeholder="Drop Here"/>
              </Col>
              <Col sm="3">
                <Palette paletteElements={this.paletteItemsToBeRendered}/>
                <Trash/>
                <Button color="danger" onClick={this._clearState}>Flush Canvas</Button>
              </Col>
            </Row>
          </TabPane>}
          {this.state.activeTab==2 && <TabPane tabId="2">
            <Row className="mt-3 page-builder">
              <Preview>
                {
                  ({ children }) => (
                    <div className={"col-md-12"}>
                      {children}
                    </div>
                  )
                }
              </Preview>
            </Row>
          </TabPane>}
          {this.state.activeTab==3 &&<TabPane tabId="3">
            <Row className="mt-3">
              <Col sm="12">
                <ReactJson src={this.state.currentState} collapsed theme="solarized"/>
              </Col>
            </Row>
          </TabPane>}
        </TabContent>
      </div>
    );
  }
}

export default App;
