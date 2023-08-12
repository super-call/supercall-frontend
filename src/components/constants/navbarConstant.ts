interface INavbarItem {
  name: string;
  path: string;
  icon: string;
  disabled?: boolean;
}

export const NAVBAR_ITEMS: INavbarItem[] = [];
