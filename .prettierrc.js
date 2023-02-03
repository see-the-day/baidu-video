module.exports = {
  singleQuote: true, // 使用单引号
  printWidth: 80,
  semi: false,
  bracketSpacing: true,
  trailingComma: "none",
  endOfLine: 'lf',
  tabWidth: 2,
  jsxBracketSameLine: true,
  plugins: [require('prettier-plugin-tailwindcss')],
}