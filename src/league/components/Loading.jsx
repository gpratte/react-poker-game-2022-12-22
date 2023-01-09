import React from "react";

function Loading(props) {
  const visible = props.isGlobalLoading ? 'visible' : 'hidden';
  return (
    <div className="loader" style={{visibility: visible}}></div>
  )
}

export default Loading;