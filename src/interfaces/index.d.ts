export interface ICategory {
  id: number;
  category_name: string;
}

export interface IFile {
  name: string;
  percent: number;
  size: number;
  status: "error" | "success" | "done" | "uploading" | "removed";
  type: string;
  uid: string;
  url: string;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  images: IFile[];
}

export interface IProduct {
  id: number;
  product_name: string;
  category_id: string;
}

