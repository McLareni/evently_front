import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AboutusPage from '@/pages/AboutusPage';
// import { getAllEventsLoader } from '@/loaders/getAllEventsLoader';
import Home from '@/pages/Home';
import OrganizersPage from '@/pages/OrganizersPage';
import UserProfile from '@/pages/UserProfile';
import AdminEvents from '@/pages/admin/AdminEvents';
import AdminUsers from '@/pages/admin/AdminUsers';
import Notifications from '@/pages/admin/Notification';
import PromoEvents from '@/pages/admin/PromoEvents';
import UserProfileAdmin from '@/pages/admin/UserProfile';
import AllEventsPage from '@/pages/events/AllEventsPage';
import BuyTicket from '@/pages/events/BuyTicket';
import CreateEventForm from '@/pages/events/CreateEventPage';
import EditEventPage from '@/pages/events/EditEventPage';
import EventDetails from '@/pages/events/EventDetails';
import Favourite from '@/pages/user/Favourite';
import MyEvent from '@/pages/user/MyEvent';
import MyTicket from '@/pages/user/MyTicket';
import Profile from '@/pages/user/Profile';

import { Layout } from '@/components/layout/Layout';

import AdminRouter from './privateRouters/AdminRouter';
import PrivateRouter from './privateRouters/PrivateRouter';
import ProfileRouter from './privateRouters/ProfileRouter';

const NotFound = React.lazy(() => import('../pages/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: getAllEventsLoader,
      },
      {
        path: 'event/:idEvent',
        element: <EventDetails />,
      },
      {
        path: 'all_events',
        element: <AllEventsPage />,
        // loader: getAllEventsLoader,
      },
      {
        path: 'organizers',
        element: <OrganizersPage />,
      },
      { path: 'about_us', element: <AboutusPage /> },

      {
        path: 'user/:idUser',
        element: <UserProfile />,
      },
      { path: 'event/:idEvent/buy_ticket', element: <BuyTicket /> },
      {
        element: <PrivateRouter />,
        children: [
          {
            path: 'create_event',
            element: <CreateEventForm />,
          },
          {
            path: 'edit_event/:idEvent',
            element: <EditEventPage />,
          },
          {
            element: <ProfileRouter />,
            children: [
              { path: 'user_profile', element: <Profile /> },
              { path: 'favourite', element: <Favourite /> },
              { path: 'my_event', element: <MyEvent /> },
              { path: 'my_tickets', element: <MyTicket /> },
              {
                path: 'admin',
                element: <AdminRouter />,
                children: [
                  {
                    path: 'users',
                    element: <AdminUsers />,
                  },
                  {
                    path: 'profile/:userId',
                    element: <UserProfileAdmin />,
                  },
                  { path: 'events', element: <AdminEvents /> },
                  { path: 'promo-events', element: <PromoEvents /> },
                  { path: 'notifications', element: <Notifications /> },
                ],
              },
            ],
          },
        ],
      },

      // Later add privat router

      //routes for future components
      // Header routes
      { path: 'popular', element: '' },

      { path: 'Kyiv', element: '' },
      { path: 'Odesa', element: '' },
      { path: 'Lviv', element: '' },
      { path: 'Kharkiv', element: '' },
      { path: 'Dnipro', element: '' },

      // Footer routes
      { path: 'office', element: '' },
      { path: 'ReturnsAndPayment', element: '' },
      { path: 'OfferAgreement', element: '' },
      { path: 'PrivacyPolicy', element: '' },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
