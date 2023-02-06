module.exports = {
  root: true,
  env: {
    browser: true, // browser global variables
    es2021: true // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
  },
  plugins: ['prettier'],
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser'
  },
  globals: {
    uni: true,
    defineProps: 'writable',
    defineEmits: 'writable',
    defineExpose: 'writable'
  },
  rules: {
    'vue/multi-word-component-names': 0,
    'import/prefer-default-export': 0,
    'vue/comment-directive': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-return-assign': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-unused-expressions': ['error', { allowShortCircuit: true }]
  }
}
