import Hero from '@/shared/components/layout/hero.component';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NodeEnvType } from './app';
import UsersActivityTablePage from '@/pages/dashboard/components/users-activity-table.page';

const FeedPage = lazy(() => import('@/pages/feed'));
const FeedListLoader = lazy(() => import('@/pages/feed/feed-list-loader'));
const FavoritesPage = lazy(() => import('@/pages/favorites'));
const ChatsPage = lazy(() => import('@/pages/chats'));
const ProfilePage = lazy(() => import('@/pages/profile'));
const SettingsPage = lazy(() => import('@/pages/settings'));
const ReviewPage = lazy(() => import('@/pages/review'));
const CoLivingPage = lazy(() => import('@/pages/profile/co-living.page'));
const ResidentPage = lazy(() => import('@/pages/profile/resident.page'));
const CoLivingApplicationRequirementsPage = lazy(
  () => import('@/pages/profile/co-living-application-requirements.page'),
);
const QuestionnairePage = lazy(() => import('@/pages/questionnaire'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const DashboardPageUsers = lazy(() => import('@/pages/dashboard/dashboard.page.users'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));
const AuthPage = lazy(() => import('@/pages/auth'));
const ChangePasswordPage = lazy(() => import('@/pages/changePassword'));
const ResidentProfilePage = lazy(() => import('@/pages/residentProfile'));

const UserProfileAdminPage = lazy(
  () => import('@/pages/admin/user-profile.admin.page'),
);

export default function Router({ nodeEnv }: NodeEnvType) {
  const redirectUri = encodeURIComponent(
    `${window.location.origin}${nodeEnv === 'development' ? '' : '/profile'}`,
  );

  return (
    <BrowserRouter>
      <Suspense fallback={<Hero navbar />}>
        <Routes>
          <Route path="/" element={<FeedListLoader nodeEnv={nodeEnv} />} />
          <Route path="/:id" element={<FeedPage nodeEnv={nodeEnv} />} />
          <Route path="/follows" element={<FavoritesPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/co-living/add" element={<CoLivingPage />} />
          <Route
            path="/profile/co-living/edit/:id"
            element={<CoLivingPage />}
          />
          <Route
            path="/profile/co-living/application-requirements"
            element={<CoLivingApplicationRequirementsPage />}
          />
          <Route path="/profile/resident/add" element={<ResidentPage />} />
          <Route
            path="/co-living/:id/questionnaire"
            element={<QuestionnairePage nodeEnv={nodeEnv} />}
          />
          <Route path="/profile/settings" element={<SettingsPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/users" element={<DashboardPageUsers />} />
          <Route
            path="/dashboard/users-activity"
            element={<UsersActivityTablePage />}
          />
          <Route
            path="/sign-in"
            Component={() => {
              window.location.href = `https://feliciti-auth.us.auth0.com/authorize?response_type=token&client_id=lgHDiWF8qtGaybRILbGRBp9chpz6NxuL&redirect_uri=${redirectUri}&scope=openid%20profile%20email&audience=${encodeURIComponent(
                import.meta.env.VITE_APP_API_URL,
              )}`;
              return null;
            }}
          />
          <Route
            path="/sign-up"
            Component={() => {
              window.location.href = `https://feliciti-auth.us.auth0.com/authorize?response_type=token&client_id=lgHDiWF8qtGaybRILbGRBp9chpz6NxuL&redirect_uri=${redirectUri}&scope=openid%20profile%20email&audience=${encodeURIComponent(
                import.meta.env.VITE_APP_API_URL,
              )}&screen_hint=signup`;
              return null;
            }}
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/changePassword" element={<ChangePasswordPage />} />
          <Route
            path="/residentProfile/:userID/:colivingID?"
            element={<ResidentProfilePage />}
          />
          <Route
            path="/admin/user-profile/:userID/edit"
            element={<UserProfileAdminPage />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
