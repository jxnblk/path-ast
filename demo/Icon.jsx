
import React from 'react'
import icons from './icons'
import { clone, cloneDeep } from 'lodash'
import { stringify } from '..'

export default class Icon extends React.Component {

  render() {
    const {
      size,
      name,
      scale,
      rotation,
      translateX,
      translateY
    } = this.props
    const styles = {
      svg: {
        overflow: 'visible',
      },
      path: {
        opacity: .25,
        fill: 'red',
      },
      guide: {
        fill: 'none',
        strokeWidth: .25,
        stroke: 'cyan',
        opacity: .25
      },
      ghost: {
        fill: 'blue',
        opacity: .25
      }
    }
    const icon = icons[name] || ''
    const d = stringify(icon)
    const d2 = stringify(
      cloneDeep(icon)
        .rotate(rotation, 16, 16)
        .scale(scale, 16, 16)
        .translate(translateX, translateY)
    )
    console.log(name, scale, rotation)

    return (
      <div style={{ display: 'inline-block', margin: 32 }}>
        <svg
          width={size * 4}
          height={size * 4}
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
          <path d={d} style={styles.path} />
          <path d={d2} style={styles.ghost} />
        </svg>
      </div>
    )
  }

}

Icon.propTypes = {
  name: React.PropTypes.string,
  size: React.PropTypes.number,
}

Icon.defaultProps = {
  name: 'bookmark',
  size: 32,
}

