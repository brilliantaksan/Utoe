import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { DataProvider } from "contexts/DataContext";
import { RecruiterProvider } from "contexts/RecruiterContext";
import Landing from "pages/landing";
import TalentMap from "pages/talent-map";
import ProfileBuilder from "pages/profile-builder";
import RecruiterDashboard from "pages/recruiter";
import NotFound from "pages/NotFound";

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