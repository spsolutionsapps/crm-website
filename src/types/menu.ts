export type SubmenuItem = {
    label: string;
    href: string;
  };    
  
  export type HeaderItem = {
    label: string;
    href: string;
    submenu?: SubmenuItem[];
    hot?: boolean;
  };