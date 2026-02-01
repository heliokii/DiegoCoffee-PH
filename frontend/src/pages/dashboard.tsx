import * as icon from '@mdi/js';
import Head from 'next/head'
import React from 'react'
import axios from 'axios';
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import BaseIcon from "../components/BaseIcon";
import { getPageTitle } from '../config'
import Link from "next/link";

import { hasPermission } from "../helpers/userPermissions";
import { fetchWidgets } from '../stores/roles/rolesSlice';
import { WidgetCreator } from '../components/WidgetCreator/WidgetCreator';
import { SmartWidget } from '../components/SmartWidget/SmartWidget';

import { useAppDispatch, useAppSelector } from '../stores/hooks';
const Dashboard = () => {
    const dispatch = useAppDispatch();
    const iconsColor = useAppSelector((state) => state.style.iconsColor);
    const corners = useAppSelector((state) => state.style.corners);
    const cardsStyle = useAppSelector((state) => state.style.cardsStyle);

    const loadingMessage = 'Loading...';

    
    const [users, setUsers] = React.useState(loadingMessage);
    const [roles, setRoles] = React.useState(loadingMessage);
    const [permissions, setPermissions] = React.useState(loadingMessage);
    const [menu_items, setMenu_items] = React.useState(loadingMessage);
    const [categories, setCategories] = React.useState(loadingMessage);
    const [promotions, setPromotions] = React.useState(loadingMessage);
    const [reservations, setReservations] = React.useState(loadingMessage);
    const [pitches, setPitches] = React.useState(loadingMessage);
    const [locations, setLocations] = React.useState(loadingMessage);
    const [orders, setOrders] = React.useState(loadingMessage);
    const [media, setMedia] = React.useState(loadingMessage);
    const [pages, setPages] = React.useState(loadingMessage);

    
    const [widgetsRole, setWidgetsRole] = React.useState({
        role: { value: '', label: '' },
    });
    const { currentUser } = useAppSelector((state) => state.auth);
    const { isFetchingQuery } = useAppSelector((state) => state.openAi);
    
    const { rolesWidgets, loading } = useAppSelector((state) => state.roles);
    
    
    async function loadData() {
        const entities = ['users','roles','permissions','menu_items','categories','promotions','reservations','pitches','locations','orders','media','pages',];
        const fns = [setUsers,setRoles,setPermissions,setMenu_items,setCategories,setPromotions,setReservations,setPitches,setLocations,setOrders,setMedia,setPages,];

        const requests = entities.map((entity, index) => {
          
          if(hasPermission(currentUser, `READ_${entity.toUpperCase()}`)) {
            return axios.get(`/${entity.toLowerCase()}/count`);
          } else {
            fns[index](null);
            return Promise.resolve({data: {count: null}});
          }
          
        });

        Promise.allSettled(requests).then((results) => {
            results.forEach((result, i) => {
                if (result.status === 'fulfilled') {
                    fns[i](result.value.data.count);
                } else {
                    fns[i](result.reason.message);
                }
            });
        });
    }
  
    async function getWidgets(roleId) {
        await dispatch(fetchWidgets(roleId));
    }
    React.useEffect(() => {
        if (!currentUser) return;
        loadData().then();
        setWidgetsRole({ role: { value: currentUser?.app_role?.id, label: currentUser?.app_role?.name } });
    }, [currentUser]);

    React.useEffect(() => {
        if (!currentUser || !widgetsRole?.role?.value) return;
        getWidgets(widgetsRole?.role?.value || '').then();
    }, [widgetsRole?.role?.value]);
  
  return (
    <>
      <Head>
        <title>
            {getPageTitle('Overview')}
        </title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
            icon={icon.mdiChartTimelineVariant}
            title='Overview'
            main>
          {''}
        </SectionTitleLineWithButton>
        
        {hasPermission(currentUser, 'CREATE_ROLES') && <WidgetCreator
            currentUser={currentUser}
            isFetchingQuery={isFetchingQuery}
            setWidgetsRole={setWidgetsRole}
            widgetsRole={widgetsRole}
        />}
        {!!rolesWidgets.length &&
            hasPermission(currentUser, 'CREATE_ROLES') && (
                <p className='  text-gray-500 dark:text-gray-400 mb-4'>
                    {`${widgetsRole?.role?.label || 'Users'}'s widgets`}
                </p>
            )}

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6 grid-flow-dense'>
            {(isFetchingQuery || loading) && (
                <div className={` ${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 text-lg leading-tight   text-gray-500 flex items-center ${cardsStyle} dark:border-dark-700 p-6`}>
                    <BaseIcon
                        className={`${iconsColor} animate-spin mr-5`}
                        w='w-16'
                        h='h-16'
                        size={48}
                        path={icon.mdiLoading}
                    />{' '}
                    Loading widgets...
                </div>
            )}

            { rolesWidgets &&
                rolesWidgets.map((widget) => (
                    <SmartWidget
                        key={widget.id}
                        userId={currentUser?.id}
                        widget={widget}
                        roleId={widgetsRole?.role?.value || ''}
                        admin={hasPermission(currentUser, 'CREATE_ROLES')}
                    />
            ))}
        </div>

        {!!rolesWidgets.length && <hr className='my-6 text-midnightBlueTheme-mainBG  ' />}
        
        <div id="dashboard" className='grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6'>
        
          
            {hasPermission(currentUser, 'READ_USERS') && <Link href={'/users/users-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Users
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {users}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={icon.mdiAccountGroup || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_ROLES') && <Link href={'/roles/roles-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Roles
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {roles}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={icon.mdiShieldAccountVariantOutline || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_PERMISSIONS') && <Link href={'/permissions/permissions-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Permissions
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {permissions}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={icon.mdiShieldAccountOutline || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_MENU_ITEMS') && <Link href={'/menu_items/menu_items-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Menu items
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {menu_items}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiCoffee' in icon ? icon['mdiCoffee' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_CATEGORIES') && <Link href={'/categories/categories-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Categories
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {categories}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiFormatListBulleted' in icon ? icon['mdiFormatListBulleted' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_PROMOTIONS') && <Link href={'/promotions/promotions-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Promotions
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {promotions}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiTag' in icon ? icon['mdiTag' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_RESERVATIONS') && <Link href={'/reservations/reservations-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Reservations
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {reservations}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiCalendar' in icon ? icon['mdiCalendar' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_PITCHES') && <Link href={'/pitches/pitches-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Pitches
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {pitches}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiLightbulbOn' in icon ? icon['mdiLightbulbOn' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_LOCATIONS') && <Link href={'/locations/locations-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Locations
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {locations}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiMapMarker' in icon ? icon['mdiMapMarker' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_ORDERS') && <Link href={'/orders/orders-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Orders
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {orders}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiCart' in icon ? icon['mdiCart' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_MEDIA') && <Link href={'/media/media-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Media
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {media}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiImage' in icon ? icon['mdiImage' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
            {hasPermission(currentUser, 'READ_PAGES') && <Link href={'/pages/pages-list'}>
                <div
                    className={`${corners !== 'rounded-full'? corners : 'rounded-3xl'} dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
                >
                    <div className="flex justify-between align-center">
                        <div>
                            <div className="text-lg leading-tight   text-gray-500 dark:text-gray-400">
                              Pages
                            </div>
                            <div className="text-3xl leading-tight font-semibold">
                                {pages}
                            </div>
                        </div>
                        <div>
                            <BaseIcon
                                className={`${iconsColor}`}
                                w="w-16"
                                h="h-16"
                                size={48}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                path={'mdiFileDocument' in icon ? icon['mdiFileDocument' as keyof typeof icon] : icon.mdiTable || icon.mdiTable}
                            />
                        </div>
                    </div>
                </div>
            </Link>}
          
          
        </div>
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
