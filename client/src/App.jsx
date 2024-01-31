import LinkInput from './components/LinkInput';
import './App.css';

function App() {
	return (
		<main className="h-screen overflow-x-hidden box-border bg-[#FBF9FB] p-0 m-0 text-2xl font-league flex flex-col justify-center items-center">
			<h1 className="text-8xl text-center mt-[5rem] mb-[3rem]">YTIZ-MP3</h1>
			<LinkInput />
		</main>
	);
}

export default App;
