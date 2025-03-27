import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [contador, setContador] = useState(0);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <Login />
    </div>
  );
}

export default App;
