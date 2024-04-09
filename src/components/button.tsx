import clsx from 'clsx'
import React, { ReactNode } from 'react'
type Props = {
	children: ReactNode
	variant?: 'primary' | 'secondary',
	onClickHandler?: () => void
}
export default function Button({  children, variant = 'primary', onClickHandler}: Props) {
	return (
		<button
			className={clsx(
				'w-full py-3 px-4 border rounded justify-center flex border-black',
				variant === 'primary' && 'border-black bg-black text-white',
				variant === 'secondary' && 'bg-white text-black'
			)}
		>
			{children}
		</button>
	)
}
