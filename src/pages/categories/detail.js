import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import _map from "lodash/map";
import { List, Avatar, Button } from "antd";
import PracPopup from '../questionnaries/practice';

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
                <Button type="default" style={{ marginLeft: 8 }} onClick={this.togglePopup.bind(this)}>
                  Practice
                </Button>                
                <Button type="default" style={{ marginLeft: 8 }}>
                  Take Test
                </Button>                
              </div>
              {this.state.showPopup ?  
                <PracPopup  
                  title={item.title + ' Practice'}
                  content={item.content}
                  closePopup={this.togglePopup.bind(this)}
                  id={item.id}
                />  
                : null  
              }
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
