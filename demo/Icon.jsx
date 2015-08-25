
import React from 'react'
import icons from './icons'
import { clone, cloneDeep } from 'lodash'
import { stringify } from '..'

export default class Icon extends React.Component {

  render() {
    const { size, name, scale, outline } = this.props
    const styles = {
      svg: {
        // fill: outline ? 'none' : 'currentcolor',
        // stroke: outline ? 'currentcolor' : null,
        overflow: 'visible',
        fill: 'silver',
        stroke: 'pink'
      },
      guide: {
        fill: 'none',
        strokeWidth: .25,
        stroke: 'tomato',
        opacity: .5
      },
      ghost: {
        fill: 'none',
        strokeWidth: .5,
        stroke: 'red'
      }
    }
    const icon = icons[name] || ''
    const d = stringify(icon)
    const dr = stringify(cloneDeep(icon).rotate(16, 16, 0))

    return (
      <div>
        <svg
          width={size * scale}
          height={size * scale}
          viewBox={`0 0 ${size} ${size}`}
          style={styles.svg}>
          <rect width={size}
            height={size}
            style={styles.guide} />
          <path d={[
            'M', 0, 16, 'L', 32, 16,
            'M', 16, 0, 'L', 16, 32,
            'M', 0, 0, 'L', 32, 32,
            'M', 32, 0, 'L', 0, 32,
          ].join(' ')} style={styles.guide} />
          <path d={d} />
          <path d={dr} style={styles.ghost} />
        </svg>
        <pre>{JSON.stringify(d, null, '  ')}</pre>
        <pre>{JSON.stringify(dr, null, '  ')}</pre>
      </div>
    )
  }

}

Icon.propTypes = {
  name: React.PropTypes.string,
  size: React.PropTypes.number,
  scale: React.PropTypes.number
}

Icon.defaultProps = {
  name: 'bookmark',
  size: 32,
  scale: 4
}

