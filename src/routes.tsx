import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import NotFoundPage from "./pages/NotFound";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import UsersPage from "./pages/UsersPage";
import EventsPage from "./pages/EventsPage";
import BookingsPage from "./pages/Booking";
import HomePage from "./pages/HomePage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/bookings" element={<BookingsPage />} />
                <Route path="/dashboard/events" element={<EventsPage />} />
                <Route path="/dashboard/users" element={<UsersPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes