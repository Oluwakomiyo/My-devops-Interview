import { useEffect, useState } from "react";
import { getMessage } from "./api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessage().then(data => setMessage(data.message));
  }, []);

  return <h1>{message}</h1>;
}

export default App;