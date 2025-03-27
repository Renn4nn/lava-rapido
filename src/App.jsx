import { useState } from "react";

function App(){

  const [contador, setContador] = useState(0);


  return(
    <div>
      <h1 class="bg-red-700">Contador</h1>
      <button onClick={() => setContador(contador+1)} class="bg-blue-400">Clique aqui</button>
      <h1 class="bg-emerald-400">{contador}</h1>
    </div>
  )
}

export default App;