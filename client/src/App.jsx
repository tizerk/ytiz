import { useState } from 'react';
import './App.css';

function App() {
	return (
		<>
			<h1 className="heading">YTIZ-MP3</h1>
			<div className="url-container">
				<form method="post">
					<div className="url-input">
						<input
							className="input"
							type="url"
							id="url"
							name="url"
							placeholder="Enter URL Here..."
						/>
					</div>
					<button className="submit" type="submit">
						Submit
					</button>
				</form>

				<p className="error" style={{ color: 'red' }}>
					Error Message
				</p>
			</div>
		</>
	);
}

export default App;
