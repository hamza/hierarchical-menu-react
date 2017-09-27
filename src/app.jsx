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
  const { title, items, depth, currentDepth, goBack, handleItemClick, pageId, selectedPage, parentOfSelected } = props;

  return (
    <div
      className={style.slidePage}
      style={{
        // display: (props.selectedPage === props.pageId) ? 'block' : 'none',
        left: `${depth * 100}%`,
        transform: `translateX(${currentDepth * -100}%)`,
      }}>
      <h1>{title}</h1>
      {(depth !== 0) ? <div className={style.goBack} onClick={() => goBack(parentOfSelected)}>◀ Back</div> : null}
      <ul className={style.itemList}>
        {
          items.map(item =>
            <ListItem
              key={item.name}
              name={item.name}
              itemId={item.id}
              parentId={pageId}
              depth={depth + 1}
              hasChildren={item.childNodes !== undefined}
              handleItemClick={handleItemClick}
            />
          )
        }
      </ul>
    </div>
  );
}

function ListItem(props) {
  const { name, itemId, depth, hasChildren, handleItemClick } = props;

  return (
    <li
      onClick={() => hasChildren ? handleItemClick(itemId, depth) : () => null}
    >
      {name}
      {hasChildren ? <span className={style.rightArrow}>▶</span> : null}
    </li>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.drawPages = this.drawPages.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.goBack = this.goBack.bind(this);

    this.state = {
      currentDepth: 0,
      selectedPage: 1,
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
              {
                id: 5,
                name: "Whitehawk",
                childNodes: [
                  { id: 10, name: "Spot by the window" },
                  { id: 11, name: "Seat by the Polycom" }
                ]
              },
              {
                id: 6,
                name: "Lobby",
                childNodes: [
                  { id: 7, name: "Gerald's Desk" },
                  { id: 8, name: "Couch" },
                  { id: 9, name: "TVs" },
                ]
              }
            ]
          }
        ]
      }
    };
  }

  handleItemClick(itemId, depth) {
    this.setState({
      selected: itemId,
      parentOfSelected: this.state.selected,
      currentDepth: depth,
    });
  }

  goBack(targetId) {
    this.setState({
      selectedPage: targetId,
      currentDepth: this.state.currentDepth - 1,
    })
  }

  drawPages(node) {
    var pages = [];
    var { currentDepth, selectedPage } = this.state;
    var { handleItemClick, goBack } = this;

    function recurse(_node, depth) {
      if (_node.childNodes !== undefined) {
        pages.push(
          <Page
            key={_node.id}
            pageId={_node.id}
            title={_node.name}
            items={_node.childNodes}
            depth={depth}
            currentDepth={currentDepth}
            selectedPage={selectedPage}
            handleItemClick={handleItemClick}
            goBack={goBack}
          />
        );

        _node.childNodes.forEach(child => recurse(child, depth + 1));
      }
    }

    recurse(node, 0);
    return pages;
  }

  render() {
    var pages = this.drawPages(this.state.tree);

    return (
      <div className={style.appContainer}>
        <Container>
          {pages}
        </Container>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
