import { StaticImageData } from "next/image"
import { SVGProps } from "react"

export type MemeImageType = {
	id: string
	name: string
	url: string
	width?: number
	height?: number
	box_count?: number
	captions?: number
}

export type StylesType = {
	text: string
	color: string;
	fontSize: number;
	fontFamily: string;
	transform: "normal-case" | "uppercase";
	weight: "bold" | "normal";
	style: "italic" | "not-italic";
	align: "left" | "center" | "right"
};


export type StickerType = {
	id: number
	image: StaticImageData
	size: number
}

export type FilterImageType = {
	color: string;
	opacity: number;
}

export type SvgProps = {
	className?: string | undefined;
} & SVGProps<SVGSVGElement>
