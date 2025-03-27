import { useState } from "react";

function App() {
  const [contador, setContador] = useState(0);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl text-gray-200 font-extrabold p-2">Contador</h1>
      <button
        onClick={() => setContador(contador + 1)}
        className="text-3xl text-gray-200 border-4 p-2 w-48"
      >
        Clique aqui
      </button>
      <h1 className="text-3xl text-gray-200 border-4 p-2 w-48 text-center">
        {contador}
      </h1>
    </div>
  );
}

export default App;
