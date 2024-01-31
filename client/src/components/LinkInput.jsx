import Spinner from '../components/Spinner';
import { useState } from 'react';

function LinkInput() {
	const [link, setLink] = useState('');
	const [errorMessage, setErrorMessage] = useState('OK');
	const [download, setDownload] = useState(false);
	const handleSubmit = async (e) => {
		setDownload(true);
		setErrorMessage('OK');
		e.preventDefault();
		const response = await fetch(
			'https://ytiz-mp3-testing.up.railway.app/api/download',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ url: link }),
			}
		);
		response
			.json()
			.then(async (data) => {
				if (!data['filename'] && !data['filepath'] && data['error']) {
					setErrorMessage(data['error']);
				} else {
					const filename = data['filename'];
					const filepath = data['filepath'];
					await fetch('https://ytiz-mp3-testing.up.railway.app/api/file_send', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							filepath: filepath,
						}),
					})
						.then((response) => response.blob())
						.then((blob) => {
							const downloadUrl = URL.createObjectURL(blob);
							const link = document.createElement('a');
							link.href = downloadUrl;
							link.download = filename.replace('temporary\\', '');
							link.click();
							URL.revokeObjectURL(downloadUrl);
						});
				}
			})
			.catch((error) => {
				console.log(error);
			});
		setDownload(false);
	};
	return (
		<>
			<div className="w-[80%]">
				<form onSubmit={handleSubmit}>
					<div className="flex flex-row justify-center max-w-[100%]">
						<input
							className="rounded-l-full rounded-r-[3rem] mr-3 w-1/2 py-8 px-12 outline-none border-2 border-[var(--very-dark-magenta)] text-2xl font-bold focus:bg-[#f1e4f0] focus:text-black focus:placeholder:text-black focus:placeholder:font-bold"
							type="url"
							id="url"
							name="url"
							placeholder="Enter URL Here..."
							value={link}
							onChange={(e) => setLink(e.target.value)}
						/>
						<button
							disabled={!link}
							className="outline-none border-none font-bold text-[1.8rem] p-8 min-w-[15rem] bg-[var(--soft-pink)] text-white hover:cursor-pointer bg-[#df5392] hover:shadow-lg hover:shadow-[#50313156] rounded-r-full disabled:bg-[#672d47] disabled:text-[#787878] disabled:hover:cursor-not-allowed disabled:hover:shadow-none"
							type="submit"
						>
							Submit
						</button>
					</div>
					{
						<p
							className={`${
								errorMessage !== 'OK' ? 'visible' : 'invisible'
							} block my-0 mx-auto text-center mt-8 font-bold text-2xl max-w-[80%]`}
							style={{ color: 'red' }}
						>
							{errorMessage}
						</p>
					}
					<div
						className={`${
							download ? 'visible' : 'invisible'
						} flex justify-center items-center mt-12`}
					>
						{<Spinner />}
					</div>
				</form>
			</div>
		</>
	);
}
export default LinkInput;
