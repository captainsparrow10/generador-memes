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
  textStyle: "italic" | "uppercase" | "font-bold" | "none";
  color: string;
  fontSize: number;
  fontFamily: string;
};