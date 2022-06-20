import React from "react";
import { Draggable, state } from "react-page-maker";
import Toolbar from "../Toolbar";

class DraggableTitle extends React.Component {
  state = {
    showColorPicker: false,
    background: ""
  };

  handleChangeComplete = (color) => {
    const { id, dropzoneID, parentID } = this.props;
    this.setState({ background: color.hex }, () => {
      state.updateElement(id, dropzoneID, parentID, {
        payload: { background: color.hex }
      });
    });
  };

  toggleColorPicker = () => {
    this.setState({
      showColorPicker: !this.state.showColorPicker
    });
  };

  render() {
    const {
      id, showBasicContent, showPreview,
      dropzoneID, parentID, name, payload
    } = this.props;

    const background = this.state.background ||
      payload && payload.background || "#37d67a";

    if (showBasicContent) {
      return (
        <Draggable {...this.props} >
          {
            <span>Title</span>
          }
        </Draggable>
      );
    }

    if (showPreview) {
      return (
        <header style={{ background }}>
          <h2 className="center-heading">Title</h2>
        </header>
      );
    }

    return (
      <Draggable {...this.props} >
        <Toolbar  {...this.props} defaultForm={[
          {label:"color",defaultValue:"#000",type:"color",name:"color"}
        ]} />
          <header style={{ background }}>
            {/*<button onClick={this.toggleColorPicker} className="color-picker">*/}
            {/*Set Color*/}
            {/*{*/}
            {/*this.state.showColorPicker ?*/}
            {/*<BlockPicker*/}
            {/*color={ background }*/}
            {/*onChangeComplete={ this.handleChangeComplete }*/}
            {/*/> : null*/}
            {/*}*/}
            {/*</button>*/}
            <h2 className="center-heading">Title</h2>
          </header>
      </Draggable>
    );
  }
};

export default DraggableTitle;
