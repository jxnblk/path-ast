
import React from 'react'

class Input extends React.Component {

  render () {
    const { name, label } = this.props
    const styles = {
      root: {
        marginBottom: 8
      },
      label: {
        fontSize: 14,
        fontWeight: 'bold',
        display: 'block'
      },
      input: {
        fontFamily: 'inherit',
        fontSize: 'inherit',
        display: 'block',
        width: '100%',
        padding: 4,
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#bbb'
      }
    }

    return (
      <div style={styles.root}>
        <label htmlFor={name}
          style={styles.label}>
          {label || name}
        </label>
        <input {...this.props}
          style={styles.input} />
      </div>
    )
  }

}

Input.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string
}

class Range extends React.Component {

  render () {
    const { name, label, value } = this.props
    const styles = {
      root: {
        marginBottom: 8
      },
      label: {
        fontSize: 14,
        fontWeight: 'bold',
        display: 'block'
      },
      input: {
        display: 'block',
        width: '100%'
      }
    }

    return (
      <div style={styles.root}>
        <label htmlFor={name}
          style={styles.label}>
          {label || name} {value}
        </label>
        <input {...this.props}
          type='range'
          style={styles.input} />
      </div>
    )
  }

}

Range.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  value: React.PropTypes.number
}

class Col extends React.Component {

  render () {
    const { children } = this.props
    const style = {
      display: 'inline-block',
      paddingLeft: 16,
      paddingRight: 16,
      width: 256,
      maxWidth: '100%'
    }

    return (
      <div style={style} children={children} />
    )
  }

}

Col.propTypes = {
  children: React.PropTypes.element
}

export default class Controls extends React.Component {

  render () {
    const {
      handleChange,
      rotation,
      scale,
      translateX,
      translateY
    } = this.props

    return (
      <div>
        <Col>
          <Input name='rotation'
            type='number'
            value={rotation}
            step={5}
            max={360}
            onChange={handleChange} />
        </Col>
        <Col>
          <Range name='rotation'
            value={rotation}
            step={5}
            max={360}
            onChange={handleChange} />
        </Col>
        <Col>
          <Input name='scale'
            type='number'
            value={scale}
            step={0.125}
            min={-4}
            max={4}
            onChange={handleChange} />
        </Col>
        <Col>
          <Range name='scale'
            value={scale}
            step={0.125}
            min={-4}
            max={4}
            onChange={handleChange} />
        </Col>
        <Col>
          <Input name='translateX'
            type='number'
            value={translateX}
            step={1}
            min={-32}
            max={32}
            onChange={handleChange} />
        </Col>
        <Col>
          <Range name='translateX'
            value={translateX}
            step={1}
            min={-32}
            max={32}
            onChange={handleChange} />
        </Col>
        <Col>
          <Input name='translateY'
            type='number'
            value={translateY}
            step={1}
            min={-32}
            max={32}
            onChange={handleChange} />
        </Col>
        <Col>
          <Range name='translateY'
            value={translateY}
            step={1}
            min={-32}
            max={32}
            onChange={handleChange} />
        </Col>
      </div>
    )
  }

}

Controls.propTypes = {
  handleChange: React.PropTypes.func,
  rotation: React.PropTypes.number,
  scale: React.PropTypes.number,
  translateX: React.PropTypes.number,
  translateY: React.PropTypes.number
}

