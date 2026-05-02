import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';
import { Loader2 } from 'lucide-react';

// Lazy load pages
const Home = lazy(() => import('./pages/common/Home'));
const SalonDetails = lazy(() => import('./pages/salon/SalonDetails'));
const Booking = lazy(() => import('./pages/booking/Booking'));
const Login = lazy(() => import('./pages/auth/Login'));
const Dashboard = lazy(() => import('./pages/user/Dashboard'));
const Profile = lazy(() => import('./pages/user/Profile'));
const SalonOwnerLogin = lazy(() => import('./pages/auth/SalonOwnerLogin'));
const OwnerDashboard = lazy(() => import('./pages/owner/OwnerDashboard'));
const MyBookings = lazy(() => import('./pages/booking/MyBookings'));
const SalonFinder = lazy(() => import('./pages/salon/SalonFinder'));
const CitySalons = lazy(() => import('./pages/salon/CitySalons'));
const ServiceSelection = lazy(() => import('./pages/common/ServiceSelection'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const PartnerRegistration = lazy(() => import('./pages/owner/PartnerRegistration'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const AddOwner = lazy(() => import('./pages/owner/AddOwner'));
const SalonOnboarding = lazy(() => import('./pages/owner/SalonOnboarding'));
const AdminApp = lazy(() => import('./admin/AdminApp'));
const CreatePassword = lazy(() => import('./pages/auth/CreatePassword'));
const CategoryPage = lazy(() => import('./pages/salon/CategoryPage'));
const Packages = lazy(() => import('./pages/offers/Packages'));
const CorporateBookings = lazy(() => import('./pages/offers/CorporateBookings'));
const GiftCards = lazy(() => import('./pages/offers/GiftCards'));
const SpecialOffers = lazy(() => import('./pages/offers/SpecialOffers'));

// Loading component for Suspense
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
    <p className="text-gray-500 font-medium">Loading...</p>
  </div>
);

// Scrolls to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  const [serviceType, setServiceType] = useState(localStorage.getItem('serviceType'));

  return (
    <AuthProvider>
      <LocationProvider>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* ── Admin/Owner routes — always accessible, no service gate ── */}
              <Route path="/admin/add-owner" element={<AddOwner />} />
              <Route path="/owner-login" element={<SalonOwnerLogin />} />
              <Route path="/create-password" element={<CreatePassword />} />
              <Route path="/owner-dashboard" element={<OwnerDashboard serviceType={serviceType} />} />
              <Route path="/salon-onboarding" element={<SalonOnboarding />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/partner-registration" element={<PartnerRegistration />} />
              <Route path="/admin/*" element={<AdminApp />} />

              {/* ── All other routes — behind service selection ── */}
              <Route
                path="*"
                element={
                  !serviceType ? (
                    <ServiceSelection setServiceType={setServiceType} />
                  ) : (
                    <div className="min-h-screen bg-base flex flex-col font-sans text-gray-800">
                      <ScrollToTop />
                      <Navbar setServiceType={setServiceType} serviceType={serviceType} />
                      <main className="flex-1 w-full px-4 sm:px-6 lg:px-12 py-6">
                        <Suspense fallback={<PageLoader />}>
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/salon/:slugOrId" element={<SalonDetails />} />
                            <Route path="/booking/:id" element={<Booking />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/dashboard" element={<Dashboard serviceType={serviceType} />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/my-bookings" element={<MyBookings />} />
                            <Route path="/salon-finder" element={<SalonFinder />} />
                            <Route path="/find-salon" element={<SalonFinder />} />
                            <Route path="/city/:cityName" element={<CitySalons />} />
                            <Route path="/category/:categoryName" element={<CategoryPage />} />
                            <Route path="/packages" element={<Packages />} />
                            <Route path="/corporate" element={<CorporateBookings />} />
                            <Route path="/giftcards" element={<GiftCards />} />
                            <Route path="/special" element={<SpecialOffers />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                          </Routes>
                        </Suspense>
                      </main>
                      <Footer />
                    </div>
                  )
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;

