import React from 'react';
import ReactDOM from 'react-dom';

import index from './index.html';
import style from './style.css';

function Container(props) {
  return (
    <div className={style.slideContainer}>
      {props.children}
    </div>
  );
}

function Page(props) {
  const { items, depth, currentDepth } = props;

  return (
    <div
      className={style.slidePage}
      style={{
        backgroundColor: color,
        left: `${depth * 100}%`,
        transform: `translateX(${currentPage * -100}%)`,
      }}>
      {props.children}
    </div>
  );
}

function ListItem(props) {
  const { name, childNodes } = props;

  return (
    <div></div>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.drawPages = this.drawPages.bind(this);

    this.state = {
      currentDepth: 0,
      selected: 1,
      parentOfSelected: null,
      tree: {
        id: 1,
        name: "Places",
        childNodes: [
          { id: 2, name: "Starbucks" },
          {
            id: 3,
            name: "ToMo HQ",
            childNodes: [
              { id: 4, name: "Quiet Room" },
              { id: 5, name: "Whitehawk" },
              { id: 6, name: "Lobby" }
            ]
          }
        ]
      }
    };
  }

  drawPages(node, depth) {
    let pages = [
      <Page
        key={node.id}
        title={node.name}
        items={node.childNodes || null}
        depth={depth}
        currentDepth={this.state.currentDepth}
      />,
    ];

    if (node.childNodes !== undefined) {
      return pages.concat(
        node.childNodes.map(child => this.drawPages(child, depth + 1))
      );
    }
  }

  render() {
    var pages = this.drawPages(this.state.tree, 0);

    return (
      <div className={style.appContainer}>
        <Container>
        </Container>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
