export const ROLES = [
  {
    id: 1,
    name: 'Admin',
    description: 'Administrator with full access',
    permissions: [
      'create_user',
      'delete_user',
      'update_user',
      'view_user',
      'manage_roles',
      'view_reports',
    ],
  },
  {
    id: 2,
    name: 'Editor',
    description: 'Editor with permissions to manage content',
    permissions: [
      'create_post',
      'delete_post',
      'update_post',
      'view_post',
      'publish_post',
    ],
  },
  {
    id: 3,
    name: 'Viewer',
    description: 'Viewer with read-only access',
    permissions: ['view_post', 'view_user', 'view_reports'],
  },
  {
    id: 4,
    name: 'Contributor',
    description: 'Contributor with permissions to create and edit own content',
    permissions: ['create_post', 'update_own_post', 'view_post'],
  },
];

export const initialValueRole = {
  id: '0',
  roleId: '0',
  roleName: '',
  description: '',
  permissions: [],
};
