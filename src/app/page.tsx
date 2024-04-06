import { PhotoIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'

type memeTypes = {
	id: string
	name: string
	url: string
	width: number
	height: number
	box_count: number
	captions: number
}

export default async function Home() {
	const data: memeTypes[] = await fetch('https://api.imgflip.com/get_memes')
		.then((res) => res.json())
		.then((res) => res.data.memes)
	console.log(data)
	return (
		<main className="p-6 flex flex-col gap-y-6">
			<header className="flex justify-between items-center">
				<h1 className="text-4xl font-bold">Imagenes</h1>
				<PhotoIcon className="h-6 w-6" />
			</header>
			<section>
				{data.map(({ id, url, width, height, name }) => (
					<div key={id}>
						<Image src={url} width={width} height={height} alt={name} />
					</div>
				))}
			</section>
		</main>
	)
}
