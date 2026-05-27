import { useState } from "react";
import { PATIENTS } from "../data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter } from "lucide-react";
import { PatientPanel } from "../components/PatientPanel";

export function Patients({ phiVisible, onNavigateToCampaigns }: { phiVisible: boolean, onNavigateToCampaigns: () => void }) {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Opted In": return "bg-[#27AE60]/10 text-[#27AE60] border border-[#27AE60]/20";
      case "Opted Out": return "bg-[#C0392B]/10 text-[#C0392B] border border-[#C0392B]/20";
      case "Callback": return "bg-[#F39C12]/10 text-[#F39C12] border border-[#F39C12]/20";
      case "Connected": 
      case "Dialling":
      case "SMS Sent": return "bg-blue-500/10 text-blue-600 border border-blue-500/20";
      default: return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const getSentimentDot = (sentiment: string) => {
    switch (sentiment) {
      case "Positive": return "bg-[#27AE60]";
      case "Negative": return "bg-[#C0392B]";
      default: return "bg-gray-400";
    }
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      
      {/* Stats bar */}
      <div className="flex items-center gap-2 text-sm text-foreground bg-white border border-border px-4 py-2 rounded-lg shadow-sm w-fit">
        <span className="font-semibold">12,400</span> <span className="text-muted-foreground">total</span>
        <span className="text-muted-foreground px-1">·</span>
        <span className="font-semibold">8,820</span> <span className="text-muted-foreground">reached</span>
        <span className="text-muted-foreground px-1">·</span>
        <span className="font-semibold">2,104</span> <span className="text-muted-foreground">booked</span>
        <span className="text-muted-foreground px-1">·</span>
        <span className="font-semibold">1,651</span> <span className="text-muted-foreground">completed</span>
        <span className="text-muted-foreground px-1">·</span>
        <span className="font-semibold">312</span> <span className="text-muted-foreground">opted out</span>
      </div>

      {/* Filter row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-border shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-[240px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search patients..." className="pl-9 bg-muted/50 border-transparent focus:border-primary h-9" />
          </div>
          
          <Select defaultValue="crc-azores">
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crc-azores">CRC Screening — Azores</SelectItem>
              <SelectItem value="flu-pilot">Flu Vaccination</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="opted-in">Opted In</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="callback">Callback</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onNavigateToCampaigns} variant="outline" className="h-9 gap-1.5 font-medium border-border">
            <Plus className="w-4 h-4" /> Create new campaign
          </Button>
          <Button className="h-9 gap-1.5 font-medium bg-secondary hover:bg-secondary/90 text-white">
            <Plus className="w-4 h-4" /> Add patients
          </Button>
        </div>
      </div>

      {/* Patient table */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden pb-12">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-foreground">Patient</TableHead>
              <TableHead className="font-semibold text-foreground">Status</TableHead>
              <TableHead className="font-semibold text-foreground">Last contact</TableHead>
              <TableHead className="font-semibold text-foreground">Attempts</TableHead>
              <TableHead className="font-semibold text-foreground">Channel</TableHead>
              <TableHead className="font-semibold text-foreground">Sentiment</TableHead>
              <TableHead className="font-semibold text-foreground w-[300px]">AI summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PATIENTS.map((p) => (
              <TableRow 
                key={p.id} 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedPatient(p)}
              >
                <TableCell className="font-medium text-foreground">
                  {phiVisible ? p.name : p.id}
                </TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center w-fit gap-1.5 ${getStatusStyle(p.status)}`}>
                    {p.status === "Dialling" && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
                      </span>
                    )}
                    {p.status}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{p.lastContact}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{p.attempts}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{p.channel}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getSentimentDot(p.sentiment)}`} />
                    <span className="text-sm text-foreground">{p.sentiment}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground truncate max-w-[300px]">
                  {p.summary}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PatientPanel 
        patient={selectedPatient} 
        phiVisible={phiVisible} 
        onClose={() => setSelectedPatient(null)} 
      />
    </div>
  );
}
