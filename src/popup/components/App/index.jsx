import React, { useState, useEffect } from "react";
import port from "../../services/port";
import "./App.scss";

export default function App() {
  useEffect(() => {
    port.onMessage.addListener(msg=>{
			console.log(msg)
		});
    port.postMessage("Hello from popup");
  }, []);

  return (
    <div>
			Hello Word
    </div>
  );
}
