import { TLoading } from "@types";
import React from "react";

type LoadingProps = {
  loading: TLoading;
  error: string | null;
  children: React.ReactNode;
};

const Loading = ({ loading, error, children }: LoadingProps) => {
  if (loading === "pending") {
    return <div>loading please wait</div>;
  }
  if (loading === "failed") {
    return <div>{error}</div>;
  }
  return <div>{children}</div>;
};

export default Loading;
