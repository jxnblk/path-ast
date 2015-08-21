
import { clone, cloneDeep } from 'lodash'
import { parse, stringify } from '..'
import geomicons from 'geomicons-open/src/js/paths'

let asts = {}
let icons = {}

Object.keys(geomicons).forEach((key) => {
  asts[key] = parse(geomicons[key])
})

asts.test = parse('M0 16 L12 0 L30 16')
asts.test.rotate(16, 16, 45)

asts['bookmark-half'] = cloneDeep(asts.bookmark)
asts['bookmark-half'] = asts['bookmark-half'].scale(.5)
console.log(asts['bookmark-half'])

asts['bookmark-double'] = cloneDeep(asts.bookmark)
asts['bookmark-double'] = asts['bookmark-double'].scale(2)

asts['bookmark-shifted'] = cloneDeep(asts.bookmark)
asts['bookmark-shifted'] = asts['bookmark-shifted'].translate(4, -4)

asts['home-flip-y'] = cloneDeep(asts.home)
asts['home-flip-y'] = asts['home-flip-y'].reflectY(16, 16)

asts['up-rotate'] = cloneDeep(asts.triangleUp)
//asts['up-rotate'] = asts['up-rotate'].rotate(16, 16, 0)

asts['bookmark-rotate'] = cloneDeep(asts.bookmark)
//asts['bookmark-rotate'] = asts['bookmark-rotate'].rotate(16, 16, 0)

asts['cloud-flip-x'] = cloneDeep(asts.cloud)
asts['cloud-flip-x'] = asts['cloud-flip-x'].reflectX(16, 16)

asts['cloud-flip-y'] = cloneDeep(asts.cloud)
asts['cloud-flip-y'] = asts['cloud-flip-y'].reflectY(16, 16)

asts['heart-flip-y'] = cloneDeep(asts.heart)
asts['heart-flip-y'] = asts['heart-flip-y'].reflectY(16, 16)

asts['musicNote-flip-x'] = cloneDeep(asts.musicNote)
asts['musicNote-flip-x'] = asts['musicNote-flip-x'].reflectX(16, 16)

asts['musicNote-flip'] = cloneDeep(asts.musicNote)
asts['musicNote-flip'] = asts['musicNote-flip'].reflectX(16, 16).reflectY(16, 16)

// toAbsolute
// rotate

Object.keys(asts).forEach((key) => {
  icons[key] = stringify(asts[key])
})

export default icons

