import { getDefaultFilter } from "@refinedev/core";

import {
  List,
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
  TagField,
} from "@refinedev/antd";

import { Table, Space, Select, Radio } from "antd";

import type { IPost, ICategory, IProduct } from "../../interfaces";

export const PostList = () => {
  const { tableProps, sorters, filters } = useTable<IProduct>({
    pagination: {
      pageSize: 20,
    },
    initialSorter: [
      {
        field: "id",
        order: "asc",
      },
    ],
    
    metaData: {
      select: "*, categories(category_name)",
    },
  });

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          key="id"
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column
          key="product_name"
          dataIndex="product_name"
          title="Product Name"
          sorter
          defaultSortOrder={getDefaultSortOrder("product_name", sorters)}
        />
        <Table.Column
          key="category_id"
          dataIndex={["categories", "category_name"]}
          title="Category"
          defaultSortOrder={getDefaultSortOrder("categories.category_name", sorters)}
          defaultFilteredValue={getDefaultFilter("category_id", filters, "in")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...selectProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column<IProduct>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
