import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },
  
  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline ?? icon.mdiTable,
    permissions: 'READ_ROLES'
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline ?? icon.mdiTable,
    permissions: 'READ_PERMISSIONS'
  },
  {
    href: '/menu_items/menu_items-list',
    label: 'Menu items',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCoffee' in icon ? icon['mdiCoffee' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_MENU_ITEMS'
  },
  {
    href: '/categories/categories-list',
    label: 'Categories',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFormatListBulleted' in icon ? icon['mdiFormatListBulleted' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CATEGORIES'
  },
  {
    href: '/promotions/promotions-list',
    label: 'Promotions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiTag' in icon ? icon['mdiTag' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_PROMOTIONS'
  },
  {
    href: '/reservations/reservations-list',
    label: 'Reservations',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCalendar' in icon ? icon['mdiCalendar' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_RESERVATIONS'
  },
  {
    href: '/pitches/pitches-list',
    label: 'Pitches',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiLightbulbOn' in icon ? icon['mdiLightbulbOn' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_PITCHES'
  },
  {
    href: '/locations/locations-list',
    label: 'Locations',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiMapMarker' in icon ? icon['mdiMapMarker' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_LOCATIONS'
  },
  {
    href: '/orders/orders-list',
    label: 'Orders',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCart' in icon ? icon['mdiCart' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ORDERS'
  },
  {
    href: '/media/media-list',
    label: 'Media',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiImage' in icon ? icon['mdiImage' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_MEDIA'
  },
  {
    href: '/pages/pages-list',
    label: 'Pages',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFileDocument' in icon ? icon['mdiFileDocument' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_PAGES'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
