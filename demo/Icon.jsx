
import React from 'react'
import icons from './icons'

export default class Icon extends React.Component {

  render() {
    const { size, name, scale } = this.props
    const styles = {
      svg: {
        fill: 'currentcolor'
      },
      rect: {
        fill: 'none',
        strokeWidth: .25,
        stroke: 'currentcolor'
      }
    }
    const d = icons[name] || ''

    return (
      <div>
        <svg
          width={size * scale}
          height={size * scale}
          viewBox={`0 0 ${size} ${size}`}
          style={styles.svg}>
          <rect width={size}
            height={size}
            style={styles.rect} />
          <path d={d} />
        </svg>
        <pre>{JSON.stringify(d, null, '  ')}</pre>
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

