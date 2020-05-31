import hex_to_hsl from './hex_to_hsl';

export default function calc_color_vars(color) {
  const [h, s, l] = hex_to_hsl(color);
  return {
    '--wsr-color-00': `hsl(${h}, ${s}%, ${l}%)`,
    '--wsr-color-05': `hsl(${h}, ${s}%, ${l + 5}%)`,
    '--wsr-color-10': `hsl(${h}, ${s}%, ${l + 10}%)`,
    '--wsr-color-20': `hsl(${h}, ${s}%, ${l + 20}%)`,
    '--wsr-color-30': `hsl(${h}, ${s}%, ${l + 30}%)`,
    '--wsr-color-40': `hsl(${h}, ${s}%, ${l + 40}%)`,
    '--wsr-color-50': `hsl(${h}, ${s}%, ${l + 50}%)`,
    '--wsr-color-60': `hsl(${h}, ${s}%, ${l + 60}%)`,
    // '--wsr-color-00-24': `hsla(${h}, ${s}%, ${l}%, 0.24)`,
    // '--wsr-color-00-42': `hsla(${h}, ${s}%, ${l}%, 0.42)`,
    // '--wsr-color-00-48': `hsla(${h}, ${s}%, ${l}%, 0.48)`,
    // '--wsr-color-30-20': `hsla(${h}, ${s}%, ${l + 30}%, 0.2)`,
  };
}
