import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <Login />
    </div>
  );
}

export default App;
