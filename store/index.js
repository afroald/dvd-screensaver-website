import random from 'random-int';

const colors = [
  'rgb(253, 238, 80)',
  'rgb(194, 69, 246)',
  'rgb(242, 151, 55)',
  'rgb(236, 67, 151)',
  'rgb(0, 66, 245)',
];

function getRandomColor() {
  return colors[random(0, colors.length - 1)];
}

export const state = () => ({
  color: getRandomColor(),
});

export const mutations = {
  // eslint-disable-next-line no-shadow
  updateColor(state) {
    state.color = getRandomColor();
  },
};
