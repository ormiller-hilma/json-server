import "./App.css";

function App() {
  async function getData() {
    try {
      const response = await fetch("http://localhost:3000/comments");

      if (!response.ok) throw new Error("Couldn't fetch data");

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  getData();

  return (
    <>
      <h1></h1>
    </>
  );
}

export default App;
