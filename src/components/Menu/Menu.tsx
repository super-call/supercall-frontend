import { menuList } from "@/constants/menuList";
import { Button } from "antd";
import React from "react";

export default function Menu() {
  return (
    <div>
      {menuList.map((menu, key) => (
        <Button type="link" key={key} href={menu.link} style={{ color: '#000', fontWeight: '500' }} className="nav-item">{menu.label}</Button>
      ))}
    </div>
  );
}
