import { useState } from "react";

import { Create, useForm, useSelect } from "@refinedev/antd";

import type { RcFile } from "antd/lib/upload/interface";
import { Form, Input, InputNumber, Select, Upload } from "antd";

import MDEditor from "@uiw/react-md-editor";

import type { IPost, ICategory, IProduct } from "../../interfaces";
import { supabaseClient, normalizeFile } from "../../utility";

export const PostCreate = () => {
  const { formProps, saveButtonProps } = useForm<IProduct>();

  const { selectProps: selectedProps } = useSelect<ICategory>({
    resource: "categories",
    optionLabel: "category_name",
    optionValue: "id",
  });;

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">

      <Form.Item
          label="Product Id"
          name="id"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        
        <Form.Item
          label="Product Name"
          name="product_name"
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
          <Select {...selectedProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
