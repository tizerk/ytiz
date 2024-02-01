import LinkInput from "./components/LinkInput";
import "./App.css";

function App() {
  return (
    <main className="font-league m-0 box-border flex h-screen flex-col items-center justify-center overflow-x-hidden bg-[var(--background)] p-0 text-2xl">
      <h1 className="mb-[3rem] mt-[5rem] text-center text-8xl text-[var(--text)]">
        YTIZ-MP3
      </h1>
      <LinkInput />
    </main>
  );
}

export default App;
