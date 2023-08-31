import FilterChain from "@/components/ManageABI/FilterChain";
import ManageABI from "@/components/ManageABI/ManageABI";
import React from "react";

export default function ManageABIView() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>SuperCall Management</h1>
      <p style={{ color: "#808080", fontSize: 14 }}>
        These code are the most recently stored on this network
      </p>
      <ManageABI />
    </div>
  );
}
