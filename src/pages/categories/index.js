import React, { Component } from "react";
import gql from "graphql-tag";
import { render } from "react-dom";
import { useQuery } from "@apollo/react-hooks";
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { graphql } from "react-apollo";
import _map from "lodash/map";

const POST_QUERY = gql`
  query CATEGORY_LIST(
    $filter: CategoryFilterInput
    $orderBy: CategoryOrderByEnum
    $limit: Int
    $offset: Int
  ) {
    categoryList(
      filter: $filter
      orderBy: $orderBy
      limit: $limit
      offset: $offset
    ) {
      count
      rows {
        id
        name
        description
        updatedAt
        createdAt
      }
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
      data.rows,
      item => ({
        href: `/categories/${item.id}`,
        id: item.id,
        content: item.description,
        title: item.name
      }),
      []
    );
  };

  render() {
    const { data } = this.props;
    const getListedData = data && this.getListedData(data.categoryList || {});

    return (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3
          }}
          dataSource={getListedData}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <IconText
                  icon={StarOutlined}
                  text="156"
                  key="list-vertical-star-o"
                />,
                <IconText
                  icon={LikeOutlined}
                  text="156"
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={MessageOutlined}
                  text="2"
                  key="list-vertical-message"
                />
              ]}
            >
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

export default graphql(POST_QUERY)(Categories);
