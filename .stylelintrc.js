const recessConfig = require('stylelint-config-recess-order')

const recessConfigWithEmptyLine = recessConfig.rules[
  'order/properties-order'
].map((group) => {
  return {
    ...group,
    emptyLineBefore: 'always',
  }
})

module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
  ],
  rules: {
    'declaration-no-important': true,
    'order/properties-order': recessConfigWithEmptyLine,
    'declaration-empty-line-before': [
      'never',
      {
        ignore: [
          'after-comment',
          'after-declaration',
          'first-nested',
          'inside-single-line-block',
        ],
      },
    ],
  },
}
