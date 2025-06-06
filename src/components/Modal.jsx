import React, { useState } from "react";

function Modal() {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState({
    title: "Title",
    body:"Body",
    button1: "Cancel",
    button2: "Confirm"
  })
  //const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      {show && (
        <div className="select-none modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">{message.title}</h3>
              </div>
              <div className="modal-body">
                <p>{message.body}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  {message.button1}
                </button>
                <button type="button" className="btn btn-primary">
                  {message.button2}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
