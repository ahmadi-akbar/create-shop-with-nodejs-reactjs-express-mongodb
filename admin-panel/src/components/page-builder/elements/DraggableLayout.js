import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";

import { Draggable, Dropzone } from "react-page-maker";
import { elements } from "../const";
import EditConfigOfElement from "../EditConfigOfElement";
import DeleteElement from "../DeleteElement";
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
  const {countOfCols}=payload;
  console.clear();
  console.log("countOfCols", countOfCols,props);
  var whatever = ['','',''];
  for(var i=0;i<countOfCols;i++){
    // whatever.push();
  }
console.log('whatever',whatever);
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
            {whatever.map((wh, h) => {

              return <Col key={h} className={'col-the-'+h}>
                {rest.childNode["canvas-1-" + h]}
              </Col>;

            })}
          </Row>
    );
  }

  const filterInitialElements = (dID) => {
    return initialElements.filter(e => e.dropzoneID === dID) || [];
  };
  console.log('wh',whatever)
  return (
    <Draggable {...props}>
      <Toolbar  {...props} defaultForm={[
        {label:"countOfCols",defaultValue:"3",type:"text",name:"countOfCols"}
      ]}/>
      <div className="mt-3">
        <Row className="auto-col">
          {whatever.map((wh, h) => {
            return <Col key={h} className={'the-co'+h}>
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
