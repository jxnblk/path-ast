
import { parse } from '..'
import geomicons from 'geomicons-open/src/js/paths'

let asts = {}

Object.keys(geomicons).forEach((key) => {
  asts[key] = parse(geomicons[key])
})

asts.r2 = parse('m0 16 c1 4 4 14 16 14 h14 v-28 l-16 0z')
asts.r3 = parse('m0 16 l16 14 h14 v-28 l-16 0z')

export default asts

