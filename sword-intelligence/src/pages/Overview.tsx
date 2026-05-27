import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { FunnelChart } from "../components/FunnelChart";
import { MessageSquare, Phone, AlertTriangle } from "lucide-react";
import { useState } from "react";

const CAMPAIGN_DATA = {
  "crc-azores": {
    context: "Active · Started 18 Jul · 1,651 completed",
    contextDot: "green",
    metrics: [
      { value: "12,400", label: "Eligible patients", desc: "Ages 50–74, unscreened 2y+", trend: "+12%" },
      { value: "8,820", label: "Reached", desc: "71% of eligible", trend: "+5%" },
      { value: "2,104", label: "Appointments booked", desc: "24% of reached", trend: "+18%" },
      { value: "1,651", label: "Screenings completed", desc: "79% show rate", trend: "+22%" },
    ],
    funnel: [
      { stage: 'Identified', count: 12400, percent: 100 },
      { stage: 'SMS sent', count: 10168, percent: 82 },
      { stage: 'Voice call', count: 6696, percent: 54 },
      { stage: 'Engaged', count: 4712, percent: 38 },
      { stage: 'Booked', count: 2104, percent: 17 },
      { stage: 'Completed', count: 1651, percent: 13 },
    ],
    channels: [
      { icon: "sms", name: "SMS nudge", stats: "10,168 sent · 41% open · 18% click", wave: "Wave 1", color: "border-l-blue-500", iconBg: "bg-blue-50 text-blue-500" },
      { icon: "voice", name: "Voice AI call", stats: "6,696 attempted · 52% answered · 31% booked", wave: "Wave 2", color: "border-l-primary", iconBg: "bg-primary/10 text-primary" },
    ],
    feed: [
      { name: "Maria S., 57", id: "Patient A4-72", action: "Voice call answered, opted in", time: "2 min ago", color: "bg-[#27AE60]" },
      { name: "Luc V., 58", id: "Patient B2-15", action: "FIT kit dispatched", time: "5 min ago", color: "bg-blue-500" },
      { name: "Anne-Marie D., 71", id: "Patient C7-91", action: "Appointment booked", time: "8 min ago", color: "bg-[#27AE60]" },
      { name: "Pieter H., 55", id: "Patient D3-44", action: "SMS opened, no action", time: "12 min ago", color: "bg-gray-400" },
      { name: "Rosa M., 68", id: "Patient E1-08", action: "Callback requested for Thu 10:00", time: "15 min ago", color: "bg-[#F39C12]" },
    ],
  },
  "flu-pilot": {
    context: "Draft · Created 22 May · Awaiting approval",
    contextDot: "gray",
    metrics: [
      { value: "4,200", label: "Eligible patients", desc: "Ages 65+, unvaccinated this season", trend: "+3%" },
      { value: "1,140", label: "Reached", desc: "27% of eligible", trend: "+8%" },
      { value: "312", label: "Appointments booked", desc: "27% of reached", trend: "+14%" },
      { value: "0", label: "Vaccinations completed", desc: "Campaign not yet active", trend: "—" },
    ],
    funnel: [
      { stage: 'Identified', count: 4200, percent: 100 },
      { stage: 'SMS sent', count: 3360, percent: 80 },
      { stage: 'Voice call', count: 0, percent: 0 },
      { stage: 'Engaged', count: 1140, percent: 27 },
      { stage: 'Booked', count: 312, percent: 7 },
      { stage: 'Completed', count: 0, percent: 0 },
    ],
    channels: [
      { icon: "sms", name: "SMS nudge", stats: "3,360 sent · 34% open · 12% click", wave: "Wave 1", color: "border-l-blue-500", iconBg: "bg-blue-50 text-blue-500" },
      { icon: "voice", name: "Voice AI call", stats: "Not yet launched", wave: "Wave 2", color: "border-l-primary", iconBg: "bg-primary/10 text-primary" },
    ],
    feed: [
      { name: "Clara M., 71", id: "Patient F2-11", action: "SMS opened, link clicked", time: "1 hr ago", color: "bg-blue-500" },
      { name: "Alberto S., 68", id: "Patient G7-45", action: "Appointment booked", time: "3 hr ago", color: "bg-[#27AE60]" },
      { name: "Dulce F., 73", id: "Patient H3-29", action: "SMS sent — no response", time: "5 hr ago", color: "bg-gray-400" },
      { name: "Nuno P., 66", id: "Patient I8-62", action: "Opted out via SMS", time: "6 hr ago", color: "bg-[#C0392B]" },
      { name: "Margarida L., 70", id: "Patient J1-88", action: "Appointment booked", time: "8 hr ago", color: "bg-[#27AE60]" },
    ],
  },
  "breast-cancer": {
    context: "Scheduled · Planned start 1 Sep · Working group forming",
    contextDot: "blue",
    metrics: [
      { value: "6,800", label: "Eligible patients", desc: "Women aged 50–69, unscreened 2y+", trend: "—" },
      { value: "0", label: "Reached", desc: "Campaign not started", trend: "—" },
      { value: "0", label: "Appointments booked", desc: "Campaign not started", trend: "—" },
      { value: "0", label: "Screenings completed", desc: "Campaign not started", trend: "—" },
    ],
    funnel: [
      { stage: 'Identified', count: 6800, percent: 100 },
      { stage: 'SMS sent', count: 0, percent: 0 },
      { stage: 'Voice call', count: 0, percent: 0 },
      { stage: 'Engaged', count: 0, percent: 0 },
      { stage: 'Booked', count: 0, percent: 0 },
      { stage: 'Completed', count: 0, percent: 0 },
    ],
    channels: [
      { icon: "sms", name: "SMS nudge", stats: "Not yet launched", wave: "Wave 1", color: "border-l-blue-500", iconBg: "bg-blue-50 text-blue-500" },
      { icon: "voice", name: "Voice AI call", stats: "Not yet launched", wave: "Wave 2", color: "border-l-primary", iconBg: "bg-primary/10 text-primary" },
    ],
    feed: [
      { name: "Working group", id: "Working group", action: "Clinical protocol submitted for review", time: "2 days ago", color: "bg-blue-500" },
      { name: "Hospital São João", id: "Hospital São João", action: "Patient list extraction in progress", time: "3 days ago", color: "bg-gray-400" },
      { name: "Campaign manager", id: "Campaign manager", action: "Script drafted — awaiting approval", time: "5 days ago", color: "bg-[#F39C12]" },
      { name: "Clinical team", id: "Clinical team", action: "Eligibility criteria confirmed", time: "1 week ago", color: "bg-[#27AE60]" },
      { name: "Sword team", id: "Sword team", action: "Campaign configuration started", time: "1 week ago", color: "bg-blue-500" },
    ],
  },
} as const;

type CampaignKey = keyof typeof CAMPAIGN_DATA;

export function Overview({ phiVisible }: { phiVisible: boolean }) {
  const [campaign, setCampaign] = useState<CampaignKey>("crc-azores");

  const data = CAMPAIGN_DATA[campaign];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Campaign filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Viewing campaign:</span>
          <Select value={campaign} onValueChange={setCampaign}>
            <SelectTrigger className="w-[280px] h-9 bg-white border-border shadow-sm font-semibold">
              <SelectValue placeholder="Select campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crc-azores">CRC Screening — Azores</SelectItem>
              <SelectItem value="flu-pilot">Flu Vaccination — Pilot</SelectItem>
              <SelectItem value="breast-cancer">Breast Cancer Screening</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="hidden sm:block w-px h-5 bg-border" />
        <span className="text-sm text-muted-foreground flex items-center gap-2">
          {data.contextDot === 'green' && <span className="w-2 h-2 rounded-full bg-[#27AE60]" />}
          {data.contextDot === 'gray' && <span className="w-2 h-2 rounded-full bg-muted-foreground" />}
          {data.contextDot === 'blue' && <span className="w-2 h-2 rounded-full bg-blue-500" />}
          {data.context}
        </span>
      </div>

      {/* Hero metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.metrics.map((stat, i) => (
          <Card key={i} className="bg-white shadow-sm border-border">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="text-4xl font-bold text-primary tracking-tight">{stat.value}</div>
                <div className="bg-[#27AE60]/10 text-[#27AE60] text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  ▲ {stat.trend}
                </div>
              </div>
              <div className="mt-2 font-semibold text-foreground text-sm">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.desc}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Outreach Funnel */}
      <Card className="bg-white shadow-sm border-border overflow-hidden">
        <div className="px-6 py-5 border-b border-border">
          <h2 className="font-semibold text-lg text-foreground">Outreach Funnel</h2>
          <p className="text-sm text-muted-foreground">End-to-end conversion performance</p>
        </div>
        <CardContent className="p-6 pt-8">
          <FunnelChart data={data.funnel} />
        </CardContent>
      </Card>

      {/* Bottom two-column section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        
        {/* Left column */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg text-foreground mb-1">Channel Performance</h2>

          {data.channels.map((ch, i) => (
            <Card key={i} className={`bg-white shadow-sm border-border border-l-4 ${ch.color} overflow-hidden`}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${ch.iconBg}`}>
                    {ch.icon === "sms" ? <MessageSquare className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{ch.name}</div>
                    <div className="text-xs text-muted-foreground">{ch.stats}</div>
                  </div>
                </div>
                <div className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-sm">{ch.wave}</div>
              </CardContent>
            </Card>
          ))}

          <div className="mt-2 bg-[#FEF3C7] border border-[#F39C12]/30 border-l-4 border-l-[#F39C12] rounded-lg p-4 flex gap-3 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-[#F39C12] shrink-0" />
            <p className="text-sm text-[#925e0b] leading-tight">
              Connect rate dropped to <span className="font-bold">44%</span> in the last 2 hours — below 50% threshold. Review call window settings.
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-lg text-foreground flex items-center gap-2">
              Live Activity
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27AE60] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#27AE60]"></span>
              </span>
            </h2>
          </div>

          <Card className="bg-white shadow-sm border-border flex-1">
            <div className="flex flex-col divide-y divide-border">
              {data.feed.map((feed, i) => (
                <div key={i} className="p-4 flex items-start gap-4 hover:bg-muted/30 transition-colors">
                  <div className={`mt-1.5 w-2 h-2 rounded-full ${feed.color} shrink-0`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">{phiVisible ? feed.name : feed.id}</span>
                      <span className="mx-2 text-muted-foreground">—</span>
                      {feed.action}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{feed.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
