export type memeImageType = {
	id: string
	name: string
	url: string
	width?: number
	height?: number
	box_count?: number
	captions?: number
}

export type styles = {
	textStyle: fontStyles
	color: string;
	fontSize: number;
	fontFamily: string;
};


export type fontStyles = {
	transform: "normal-case" | "uppercase";
	weight: "bold" | "normal";
	style: "italic" | "not-italic";
};

