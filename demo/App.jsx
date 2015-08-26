
import React from 'react'
import Icon from './Icon'
import Circle from './Circle'
import icons from './icons'

export default class App extends React.Component {

  render() {
    const styles = {
      root: {
        fontFamily: 'sans-serif',
      }
    }

    return (
      <div style={styles.root}>
        <h1>Path AST</h1>
        {/*
        <Icon name='github' />
        <Circle />
        <Icon name='bookmark-rotate' />
        */}
        <section>
          {Object.keys(icons).map((key, i) => {
            return <Icon key={i} name={key} />
          })}
        </section>
      </div>
    )
  }

}

