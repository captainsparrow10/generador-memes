import React from 'react'

export default function FontStyle() {
	return (
		<div className="flex gap-x-6">
			<div className="flex gap-x-2">
				<input
					type="radio"
					id="allCaps"
					name="formatting"
					defaultChecked
					className=" accent-black"
				/>
				<label htmlFor="allCaps">All Caps</label>
			</div>
			<div className="flex gap-x-2">
				<input
					type="radio"
					id="bold"
					name="formatting"
					className=" accent-black"
				/>
				<label htmlFor="bold">Bold</label>
			</div>
			<div className="flex gap-x-2">
				<input
					type="radio"
					id="italic"
					name="formatting"
					className=" accent-black"
				/>
				<label htmlFor="italic">Italic</label>
			</div>
		</div>
	)
}
