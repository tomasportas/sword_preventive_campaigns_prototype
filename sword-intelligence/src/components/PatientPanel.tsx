import { X, Clipboard, MessageSquare, Phone, Package, CheckCircle, AlertTriangle, Play, FileText, Send, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "recharts";

interface PatientPanelProps {
  patient: any;
  phiVisible: boolean;
  onClose: () => void;
}

export function PatientPanel({ patient, phiVisible, onClose }: PatientPanelProps) {
  if (!patient) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40 transition-opacity" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[480px] bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-start justify-between bg-white shrink-0">
          <div className="flex gap-4">
            <Avatar className="w-12 h-12 border border-border">
              <AvatarFallback className="bg-muted text-foreground font-medium">
                {phiVisible ? patient.name.charAt(0) : "P"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                {phiVisible ? patient.name : `Patient ${patient.id}`}
                <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  Age {patient.name.split(', ')[1]}
                </span>
              </h2>
              <div className="text-sm text-muted-foreground mt-1 flex flex-col gap-0.5">
                <span>GP: {phiVisible ? "Dr. Ana Sousa" : "GP anonymised"}</span>
                <span>Island: São Miguel, Azores</span>
                <span className="mt-1 font-medium text-foreground text-xs bg-accent text-primary-foreground/80 inline-flex w-fit px-2 py-0.5 rounded-sm">
                  Ages 50–74, unscreened 2y+
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Clinical Follow-up</DropdownMenuItem>
                <DropdownMenuItem>DNC (Do Not Call)</DropdownMenuItem>
                <DropdownMenuItem>Data Error</DropdownMenuItem>
                <DropdownMenuItem>Other</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* AI Summary */}
          <div className="bg-[#EBF2FA] border-l-4 border-primary rounded-r-lg p-4">
            <h3 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              AI Interaction Summary
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              {patient.summary}
              {patient.status === "Opted In" && " Implementation intention captured: 'Sunday morning'."}
            </p>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Patient Timeline</h3>
            <div className="relative pl-4 space-y-6 before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-border">
              
              <div className="relative">
                <div className="absolute -left-[27px] bg-white p-1 rounded-full">
                  <Clipboard className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Jan 5</p>
                  <p className="text-sm font-medium text-foreground">Identified as eligible</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] bg-white p-1 rounded-full">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Jan 8</p>
                  <p className="text-sm font-medium text-foreground">SMS wave 1 sent</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] bg-white p-1 rounded-full">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Jan 9</p>
                  <p className="text-sm font-medium text-foreground">Voice call attempt 1, no answer</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] bg-white p-1 rounded-full">
                  <Phone className="w-4 h-4 text-[#27AE60]" />
                </div>
                <div className="bg-card border border-border rounded-lg p-3 mt-1 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Jan 10, 14:32</p>
                      <p className="text-sm font-medium text-foreground">Voice call answered, opted in</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#27AE60]"></span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs gap-1 px-2">
                      <Play className="w-3 h-3" /> Play
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs gap-1 px-2">
                      <FileText className="w-3 h-3" /> Transcript
                    </Button>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] bg-white p-1 rounded-full">
                  <Package className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Jan 11</p>
                  <p className="text-sm font-medium text-foreground">FIT kit dispatched</p>
                </div>
              </div>

              {patient.status === "Opted In" && (
                <>
                  <div className="relative">
                    <div className="absolute -left-[27px] bg-white p-1 rounded-full">
                      <CheckCircle className="w-4 h-4 text-[#27AE60]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Jan 19</p>
                      <p className="text-sm font-medium text-foreground">Sample returned</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[27px] bg-white p-1 rounded-full">
                      <CheckCircle className="w-4 h-4 text-[#27AE60]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Jan 24</p>
                      <p className="text-sm font-medium text-foreground">Lab result: negative</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Manual SMS */}
        <div className="p-4 border-t border-border bg-muted/30 shrink-0">
          <Label className="text-xs font-semibold text-foreground mb-2 block">Manual SMS</Label>
          <div className="relative">
            <Textarea 
              placeholder="Type message to send directly to patient..."
              className="resize-none pr-10 min-h-[80px] bg-white text-sm"
            />
            <Button size="icon" className="absolute bottom-2 right-2 h-7 w-7 rounded bg-secondary hover:bg-secondary/90 text-white">
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
