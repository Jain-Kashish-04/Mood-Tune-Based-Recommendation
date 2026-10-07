import { useState } from "react";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CategorySongs from "./pages/CategorySongs";
import Recommendations from "./pages/Recommendations";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

// Simple router implementation for demo
const App = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [navigationData, setNavigationData] = useState({});

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setCurrentPage("landing");
    setNavigationData({});
  };

  // Enhanced navigation handler
  const handleNavigate = (page, data = {}) => {
    setCurrentPage(page);
    setNavigationData(data);
  };

  // Mock routing logic
  const renderPage = () => {
    switch(currentPage) {
      case "landing":
        return <Landing onNavigate={handleNavigate} />;
      case "auth":
        return <Auth onNavigate={handleNavigate} onLogin={setUser} />;
      case "dashboard":
        return user ? <Dashboard onNavigate={handleNavigate} onLogout={handleLogout} /> : <Landing onNavigate={handleNavigate} />;
      case "category-songs":
        return user ? <CategorySongs onNavigate={handleNavigate} onLogout={handleLogout} category={navigationData.category} /> : <Landing onNavigate={handleNavigate} />;
      case "recommendations":
        return user ? <Recommendations onNavigate={handleNavigate} onLogout={handleLogout} /> : <Landing onNavigate={handleNavigate} />;
      case "history":
        return user ? <History onNavigate={handleNavigate} onLogout={handleLogout} /> : <Landing onNavigate={handleNavigate} />;
      case "analytics":
        return user ? <Analytics onNavigate={handleNavigate} onLogout={handleLogout} /> : <Landing onNavigate={handleNavigate} />;
      default:
        return <NotFound onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
};

export default App;
