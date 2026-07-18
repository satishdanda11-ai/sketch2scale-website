import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import WhatWeScale from "./pages/WhatWeScale";
import PillarPage from "./pages/PillarPage";
import Industries from "./pages/Industries";
import IndustryPage from "./pages/IndustryPage";
import Work from "./pages/Work";
import Insights from "./pages/Insights";
import DiscoveryWorkshop from "./pages/DiscoveryWorkshop";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-sans)" }}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/what-we-scale" element={<WhatWeScale />} />
          <Route path="/what-we-scale/:pillar" element={<PillarPage />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:industry" element={<IndustryPage />} />
          <Route path="/work" element={<Work />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/discovery-workshop" element={<DiscoveryWorkshop />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
