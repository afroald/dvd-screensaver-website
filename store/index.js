import random from 'random-int';

const colors = [
  'rgb(253, 238, 80)',
  'rgb(194, 69, 246)',
  'rgb(242, 151, 55)',
  'rgb(236, 67, 151)',
  'rgb(0, 66, 245)',
];

function pickRandomElement(array) {
  return array[random(0, array.length - 1)];
}

export const state = () => ({
  color: pickRandomElement(colors),
});

export const mutations = {
  // eslint-disable-next-line no-shadow
  updateColor(state) {
    const availableColors = colors.filter((color) => color !== state.color);
    state.color = pickRandomElement(availableColors);
  },
};
