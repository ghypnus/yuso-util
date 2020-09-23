/**
 * rollup配置文件
 */
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import license from "rollup-plugin-license"

export default [{
  input: 'src/index.js',
  output: {
    file: 'lib/yuso-util.js',
    format: 'cjs'
  },
  plugins: [
    license({
      banner: getBanner(),
    }),
    babel(getBabel()),
  ],
  external: getExternal()
}, {
  input: 'src/index.js',
  output: {
    file: 'lib/yuso-util.min.js',
    format: 'cjs'
  },
  plugins: [
    license({
      banner: getBanner(),
    }),
    babel(getBabel()),
    terser()
  ],
  external: getExternal()
}]

function getExternal() {
  return ['uuid', 'react']
}
/**
 * banner信息
 */
function getBanner() {
  return `<%= pkg.name %>
                    author : <%= pkg.author %>
                    homepage : <%= pkg.homepage %>`
}

/**
 * babel配置信息
 */
function getBabel() {
  return {
    include: 'src/**/*.js',
    exclude: 'node_modules/**'
  }
}