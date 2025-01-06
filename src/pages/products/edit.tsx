import React, { useState } from "react";

import {
  Edit,
  ListButton,
  RefreshButton,
  useForm,
  useSelect,
} from "@refinedev/antd";

import type { RcFile } from "antd/lib/upload/interface";
import { Alert, Button, Form, Input, Select, Upload } from "antd";

import MDEditor from "@uiw/react-md-editor";

import type { IPost, ICategory, IProduct } from "../../interfaces";
import { supabaseClient, normalizeFile } from "../../utility";

export const PostEdit = () => {
  const [isDeprecated, setIsDeprecated] = useState(false);
  const {
    formProps,
    saveButtonProps,
    query: queryResult,
  } = useForm<IProduct>({
    liveMode: "manual",
    onLiveEvent: () => {
      setIsDeprecated(true);
    },
  });

  const postData = queryResult?.data?.data;
  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category_id,
    optionLabel: "category_name",
    optionValue: "id"
  });

  const handleRefresh = () => {
    queryResult?.refetch();
    setIsDeprecated(false);
  };

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      headerProps={{
        extra: (
          <>
            <ListButton />
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

      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Product Name"
          name="Product_name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category_id"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
