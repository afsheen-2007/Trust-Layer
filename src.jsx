import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    fetch("https://api.gemini.com/some-endpoint", {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Gemini API Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
