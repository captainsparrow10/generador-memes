/**
 * Convierte un color en formato hexadecimal a RGBA con la opacidad especificada.
 * @param hex - Color en formato hexadecimal (#RRGGBB).
 * @param opacity - Opacidad del color en formato decimal (0 a 1).
 * @returns Color en formato RGBA.
 */
const hexToRgba = (hex: string, opacity: number): string => {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Redirige la ventana actual a la URL especificada.
 * @param path - URL a la que se redirigirá la ventana.
 */
const redirectTo = (path: string): void => {
  window.location.href = path;
};

export { hexToRgba, redirectTo };
