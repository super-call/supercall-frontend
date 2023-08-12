export interface IToolbarItem {
  name: string;
  icon: JSX.Element;
  color?: string;
  disabled?: boolean;
  onClick: () => void;
}
