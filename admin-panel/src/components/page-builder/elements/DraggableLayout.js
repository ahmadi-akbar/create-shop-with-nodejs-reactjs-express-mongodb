import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";

import { Draggable, Dropzone } from "react-page-maker";
import { elements } from "../const";
import Toolbar from "../Toolbar";
import { unicID } from "@/functions/index";

const DraggableLayout = (props) => {
  // make sure you are passing `parentID` prop to dropzone
  // it help to mainatain the state to meta data
  const {
    dropzoneID,
    parentID,
    showBasicContent,
    showPreview,
    id,
    dropzoneProps,
    payload,
    initialElements,
    ...rest
  } = props;
  const { countOfCols } = payload;
  // console.clear();
  console.log("countOfCols", payload.countOfCols);
  // var whatever = ['','',''];
  // for(var i=0;i<countOfCols;i++){
  //   // whatever.push();
  // }
// console.log('whatever',whatever);
  if (showBasicContent) {
    return (
      <Draggable {...props} >
        <span>{rest.name}</span>
      </Draggable>
    );
  }

  const _onDrop = (data, cb = () => {
  }) => {
    // no need to ask id and name again
    if (data.payload && data.payload.dropped) {
      return cb(data);
    }

    // This can be an async call or some modal to fetch data
    let name = data.name;
    if (data.type === elements.TEXTBOX || data.type === elements.DROPDOWN) {
      name = "name";
    }
    const id = unicID();

    const result = cb({
      ...data,
      name,
      id,
      payload: { dropped: true }
    });
  };

  if (showPreview) {
    return (

      <Row className="auto-col">
        {/*{[...Array(countOfCols)].map((wh, h) => {*/}

          {/*return <Col key={h} className={"col-the-" + h}>*/}
            {/*{rest.childNode["canvas-1-" + h]}*/}
          {/*</Col>;*/}

        {/*})}*/}
      </Row>
    );
  }

  const filterInitialElements = (dID) => {
    return initialElements.filter(e => e.dropzoneID === dID) || [];
  };
  // console.clear();
  // if(!countOfCols){
  //   return <></>
  // }
  let countOfColsArray = [];
  for (var i = 0; i < countOfCols; i++) {
    countOfColsArray[i] = { "": "" };
  }
  // countOfColsArray.push();
  console.log("countOfColsArray", countOfCols, countOfColsArray, payload);
  //

  return (
    <Draggable {...props}>
      <Toolbar  {...props} defaultForm={[
        { label: "countOfCols", defaultValue: countOfCols, type: "text", name: "countOfCols" }
      ]}/>
      <div className="mt-3">
        <Row className="auto-col">
          {countOfColsArray.map((wh, h) => {
            return <Col key={h} className={"the-col dropzone the-co" + h}>
              <Toolbar  {...props} defaultForm={[
                {
                  label: "size", defaultValue: "2", type: "select-options", name: "sizeOfCol", children: [{
                    name: "1/12", value: "1"
                  }, {
                    name: "1/6", value: "2"
                  }, {
                    name: "1/4", value: "3"
                  }, {
                    name: "1/3", value: "4"
                  }, {
                    name: "1/2", value: "6"
                  }, {
                    name: "2/3", value: "8"
                  }, {
                    name: "3/4", value: "9"
                  }, {
                    name: "5/6", value: "10"
                  }, {
                    name: "1/1", value: "12"
                  }]
                }
              ]}/>
              <Dropzone
                {...dropzoneProps}
                initialElements={filterInitialElements("canvas-1-" + h)}
                id={"canvas-1-" + h}
                onDrop={_onDrop}
                placeholder="Drop Here"
              />
            </Col>;
          })}

        </Row>
      </div>
    </Draggable>
  );
};

DraggableLayout.propTypes = {
  id: PropTypes.string.isRequired,
  showBasicContent: PropTypes.bool.isRequired
};

export default DraggableLayout;
