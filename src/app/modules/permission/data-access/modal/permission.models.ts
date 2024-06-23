export interface ModuleNode {
  id: string;
  name: string;
  checked: boolean;
  expand: boolean;
  childs: GroupNode[];
}

export interface GroupNode {
  id: string;
  name: string;
  checked: boolean;
  expand: boolean;
  childs: ChildNode[];
}

export interface ChildNode {
  id: string;
  name: string;
  checked: boolean;
  expand: boolean;
  childs: any[];
}
