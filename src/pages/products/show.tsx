import { useShow, useOne , useSelect } from "@refinedev/core";

import {
  Show,
  ListButton,
  EditButton,
  RefreshButton,
} from "@refinedev/antd";

import { Typography, Space, Alert, Button } from "antd";

import type { IProduct, ICategory } from "../../interfaces";
import { useState } from "react";

const { Title, Text } = Typography;

export const PostShow = () => {
  const [isDeprecated, setIsDeprecated] = useState(false);

  const { query: queryResult } = useShow<IProduct>({
    liveMode: "manual",
    onLiveEvent: () => {
      setIsDeprecated(true);
    },
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: record?.category_id,
  });

  const { data: categoryData, isLoading: categoryIsLoading } =
    useOne<ICategory>({
      resource: "categories",
      id: record?.category_id || "",
      queryOptions: {
        enabled: !!record,
      },
    });

  const handleRefresh = () => {
    queryResult.refetch();
    setIsDeprecated(false);
  };

  return (
    <Show
      isLoading={isLoading}
      headerProps={{
        extra: (
          <>
            <ListButton />
            <EditButton />
            <RefreshButton onClick={handleRefresh} />
          </>
        ),
      }}
    >
      {isDeprecated && (
        <Alert
          message="This post is changed. Reload to see it's latest version."
          type="warning"
          style={{
            marginBottom: 20,
          }}
          action={
            <Button onClick={handleRefresh} size="small" ghost>
              Refresh
            </Button>
          }
        />
      )}

      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Product Name</Title>
      <Text>{record?.product_name}</Text>

      <Title level={5}>Category</Title>
      <Text>{categoryIsLoading ? "Loading..." : categoryData?.data.category_name}</Text>

    </Show>
  );
};
