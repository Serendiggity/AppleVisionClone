// Global design tokens for Vision OS style
export const glass = {
  thin: 'backdrop-blur-sm bg-white/10',
  regular: 'backdrop-blur bg-white/15',
  thick: 'backdrop-blur-lg bg-white/25',
};

export const radius = 'rounded-[24px]'; // Vision OS default window corner

export const accent = 'hsla(52 80% 95% / <alpha-value>)'; // pastel yellow

export const shadow = 'shadow-[0_10px_20px_rgb(0_0_0/0.15)]';

export const motion = {
  in: 'transition-all duration-300 ease-out',
  out: 'transition-all duration-200 ease-in',
  hover: 'hover:scale-[1.03] transition-transform duration-300',
};

export const text = {
  primary: 'text-white/95',
  secondary: 'text-white/75',
};

export const folderTab = {
  active: `${glass.regular} ${text.primary} font-medium ${motion.in}`,
  inactive: `${glass.thin} ${text.primary} font-medium ${motion.in} text-opacity-70 hover:text-opacity-90`,
  shape: 'clip-path-[polygon(0_0,100%_0,100%_100%,8%_100%)]', // asymmetric left-skew
};

export const panel = `${glass.thin} ${radius} ${shadow} p-6 ${motion.hover}`;

export const button = {
  primary: `w-full ${glass.regular} py-2 rounded-xl ${text.primary} ${motion.hover}`,
  outline: `px-6 py-2 rounded-xl border border-accent/50 text-accent ${motion.hover}`,
  solid: `px-6 py-2 rounded-xl bg-accent text-black font-medium ${motion.hover}`,
};

export const defaultBackgrounds = [
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
  'https://pixabay.com/get/gb1105b6449e31aed7ddf4a2b4600a8ceb8a8309285c385ef006f24f5b252f85abb6fca89e120d5c6247381acdb6f2e86b60d764ad9b904aefa4da922c905540e_1280.jpg',
  'https://pixabay.com/get/gf634702230130a660e27676f447a0c9058108192ffe6bfaacd04361638082f27d51b1e1107248f6add1c58d3dd1f8139b3b1557ef1b7b092fb7466aea1b06190_1280.jpg',
  'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
  'https://images.unsplash.com/photo-1518972559570-7cc1309f3229?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
];
