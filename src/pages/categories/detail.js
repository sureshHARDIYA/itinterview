import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import _map from "lodash/map";
import { List, Avatar } from "antd";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const POST_QUERY = gql`
  query CATEGORY_FIND($id: String!) {
    categoryFind(id: $id) {
      id
      name
      description
      questionnaires {
        id
        name
        description
      }
      createdAt
      updatedAt
    }
  }
`;

class Categories extends Component {

  constructor(props){
    super(props);
    this.state = { showPopup: false };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  getListedData = data => {
    return _map(
      data.questionnaires,
      item => ({
        id: item.id,
        href: item.id,
        content: item.description,
        title: item.name
      }),
      []
    );
  };

  render() {
    const { data } = this.props;
    const getListedData = data && this.getListedData(data.categoryFind || {});
    return (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 6
          }}
          dataSource={getListedData}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
              <div style={{ margin: "10px 0 0", textAlign: "right" }}>
                <ButtonGroup aria-label="large outlined primary button group">
                  <Button href={`${item.id}/practice`}>Practice</Button>
                  <Button href={`${item.id}/practice`}>Take Test</Button>
                </ButtonGroup>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default graphql(POST_QUERY, {
  options: ({ match }) => ({
    variables: {
      id: match.params.id
    }
  })
})(Categories);
