import { useState } from "react";
import { TopBar } from "./components/TopBar";
import { Overview } from "./pages/Overview";
import { Patients } from "./pages/Patients";
import { Campaigns } from "./pages/Campaigns";
import { TooltipProvider } from "@/components/ui/tooltip";

export type TabType = 'overview' | 'patients' | 'campaigns';
export type RoleType = 'client-admin' | 'client-operator' | 'sword-internal';

function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [phiVisible, setPhiVisible] = useState(false);
  const [role, setRole] = useState<RoleType>('client-admin');

  return (
    <TooltipProvider>
      <div className="min-h-screen w-full bg-[#F5F5F5] flex flex-col font-sans">
        <TopBar 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
          phiVisible={phiVisible}
          setPhiVisible={setPhiVisible}
          role={role}
          setRole={setRole}
        />
        <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 transition-opacity duration-150 ease-in-out">
          {currentTab === 'overview' && (
            <Overview phiVisible={phiVisible} />
          )}
          {currentTab === 'patients' && (
            <Patients phiVisible={phiVisible} onNavigateToCampaigns={() => setCurrentTab('campaigns')} />
          )}
          {currentTab === 'campaigns' && (
            <Campaigns />
          )}
        </main>
      </div>
    </TooltipProvider>
  );
}

export default App;
