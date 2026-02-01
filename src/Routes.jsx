import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { DataProvider } from "contexts/DataContext";
import { RecruiterProvider } from "contexts/RecruiterContext";
import Landing from "screens/landing";
import TalentMap from "screens/talent-map";
import ProfileBuilder from "screens/profile-builder";
import ProfileHub from "screens/profile";
import CompanyRegistrationProfileSetup from "screens/company-registration-profile-setup";
import RecruiterDashboard from "screens/recruiter";
import NotFound from "screens/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <DataProvider>
          <RecruiterProvider>
            <ScrollToTop />
            <RouterRoutes>
              <Route path="/" element={<Landing />} />
              <Route path="/map" element={<TalentMap />} />
              <Route path="/profile" element={<ProfileHub />} />
              <Route path="/profile/talent" element={<ProfileBuilder />} />
              <Route path="/profile/company" element={<CompanyRegistrationProfileSetup />} />
              <Route path="/profile/create" element={<ProfileBuilder />} />
              <Route path="/recruiter" element={<RecruiterDashboard />} />
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </RecruiterProvider>
        </DataProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
