import { Eye, EyeOff, Building, SquareSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TabType, RoleType } from "../App";

interface TopBarProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  phiVisible: boolean;
  setPhiVisible: (visible: boolean) => void;
  role: RoleType;
  setRole: (role: RoleType) => void;
}

export function TopBar({ currentTab, setCurrentTab, phiVisible, setPhiVisible, role, setRole }: TopBarProps) {
  const isOperator = role === 'client-operator';
  const isInternal = role === 'sword-internal';

  return (
    <div className="h-16 border-b border-border bg-white flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold text-sm tracking-tight">
          SI
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-foreground">Sword Intelligence</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">Centro de Oncologia dos Açores</span>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center gap-8 h-full">
        {(['overview', 'patients', 'campaigns'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`h-full flex items-center text-sm font-medium transition-colors relative px-1 capitalize ${
              currentTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
            {currentTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-sm" />
            )}
          </button>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          {phiVisible ? (
            <EyeOff className={`w-4 h-4 ${isOperator ? 'text-muted-foreground' : 'text-primary'}`} />
          ) : (
            <Eye className={`w-4 h-4 ${isOperator ? 'text-muted-foreground' : 'text-muted-foreground'}`} />
          )}
          <Label htmlFor="phi-toggle" className={`text-sm cursor-pointer ${isOperator ? 'text-muted-foreground' : 'text-foreground'}`}>
            View PHI
          </Label>
          <Switch 
            id="phi-toggle" 
            checked={isOperator ? false : phiVisible}
            onCheckedChange={setPhiVisible}
            disabled={isOperator}
            className="ml-1"
          />
        </div>
        
        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-4">
          <Select value={role} onValueChange={(val: RoleType) => setRole(val)}>
            <SelectTrigger className="h-8 border-none shadow-none text-sm w-[220px] focus:ring-0 px-0 hover:bg-transparent">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="client-admin">Viewing as: Client Admin</SelectItem>
              <SelectItem value="client-operator">Viewing as: Client Operator</SelectItem>
              <SelectItem value="sword-internal">Viewing as: Sword Internal</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            {isInternal && (
              <span className="bg-secondary/10 text-secondary text-xs font-semibold px-2 py-0.5 rounded-sm">
                Internal
              </span>
            )}
            <Avatar className="w-8 h-8 border border-border">
              <AvatarFallback className="bg-primary text-white text-xs">JR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}
