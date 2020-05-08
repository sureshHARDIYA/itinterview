import React, { Component } from "react";
import gql from "graphql-tag";
import { render } from "react-dom";
import { useQuery } from "@apollo/react-hooks";
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { graphql } from "react-apollo";
import _map from "lodash/map";

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

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

class Categories extends Component {
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

    console.log(getListedData);
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
