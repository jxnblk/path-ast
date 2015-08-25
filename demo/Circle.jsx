
import React from 'react'

export default class Circle extends React.Component {

  render() {

    const style = {
      fill: 'none',
      stroke: 'currentcolor',
      strokeWidth: 2,
      overflow: 'visible'
    }

    function rad(deg) {
      return Math.PI * deg / 180
    }

    function deg(rad) {
      return rad * 180 / Math.PI
    }

    function rx(r, a) {
      return r * Math.cos(rad(a))
    }

    function ry(r, a) {
      return r * Math.sin(rad(a))
    }

    function getAngle(a, b) {
      return deg(Math.atan(a / b))
    }


    const a = 45
    const r = 16
    const points = [
      [0, 16],
      [16, 0],
      [32, 16],
      [16, 32],
      [0, 16],
    ]
    const d = [
      points.map((p, i) => {
        const n = getAngle(r - p[0], r - p[1])
        console.log('angle', n)
        return [
          i === 0 ? 'M' : 'L',
          p[0],
          p[1]
        ].join(' ')
      }).join(' '),
      'z'
    ].join(' ')

    return (
      <div>
        <svg viewBox='0 0 32 32'
          width={128}
          height={128}
          style={style}>
          <path d={d} />
        </svg>
        <pre>{d}</pre>
      </div>
    )
  }

}


