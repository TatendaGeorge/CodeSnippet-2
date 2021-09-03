import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Navigation',
    isTitle: true
  },
  // {
  //   label: 'Dashboard',
  //   icon: 'home',
  //   link: '/',
  //   badge: {
  //     variant: 'success',
  //     text: '1',
  //   }
  // },
  {
    label: 'Snippets',
    icon: 'code',
    link: '/snippets',
  },
  {
    label: 'Categories',
    icon: 'list',
    link: '/categories',
  },
  {
    label: 'Users',
    icon: 'users',
    link: '/users',
  },

  // {
  //   label: 'Add Snippet',
  //   icon: 'pen-tool',
  //   link: '/snippet',
  // }
];
