import { useState } from "react";
import { CAMPAIGNS } from "../data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Play } from "lucide-react";

export function Campaigns() {
  const [editingCampaign, setEditingCampaign] = useState<any>(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active": return "bg-[#27AE60]/10 text-[#27AE60]";
      case "Draft": return "bg-gray-100 text-gray-600";
      case "Scheduled": return "bg-blue-500/10 text-blue-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-300 pb-12">
      
      {/* Campaign cards grid */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">All Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAMPAIGNS.map(camp => (
            <Card key={camp.id} className="bg-white border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg text-foreground leading-tight">{camp.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusStyle(camp.status)}`}>
                    {camp.status}
                  </span>
                </div>
                
                <div className="text-sm text-muted-foreground mb-6 flex-1">
                  {camp.id === 'crc-azores' && (
                    <p>Started 18 Jul · 1,651 completed · 50,000 calls budget · COA</p>
                  )}
                  {camp.id === 'flu-pilot' && (
                    <p>Created 22 May · Awaiting clinical approval · Sword Internal</p>
                  )}
                  {camp.id === 'breast-cancer' && (
                    <p>Planned start 1 Sep · Working group forming · Hospital São João</p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Last activity: {camp.id === 'crc-azores' ? '2 min ago' : camp.id === 'flu-pilot' ? '3 days ago' : '1 week ago'}
                  </span>
                  <Button 
                    variant={editingCampaign?.id === camp.id ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setEditingCampaign(camp)}
                    className={editingCampaign?.id === camp.id ? "bg-primary text-white" : ""}
                  >
                    {editingCampaign?.id === camp.id ? "Editing" : "Edit"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Campaign config view */}
      {editingCampaign && (
        <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="px-6 py-4 bg-muted/30 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">Configure: {editingCampaign.name}</h2>
          </div>
          
          <div className="p-8 space-y-10">
            
            {/* Campaign details */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-4 border-b border-border pb-2">Campaign Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input defaultValue={editingCampaign.name} />
                </div>
                <div className="space-y-2">
                  <Label>Health topic</Label>
                  <Select defaultValue={editingCampaign.topic}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value={editingCampaign.topic}>{editingCampaign.topic}</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Target language</Label>
                  <Select defaultValue="pt">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">Portuguese (PT-PT)</SelectItem>
                      <SelectItem value="en">English (UK)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue={editingCampaign.status.toLowerCase()}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Channels & sequencing */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-4 border-b border-border pb-2">Channels & Sequencing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border">
                  <div>
                    <Label className="font-semibold text-sm">Voice calls</Label>
                    <p className="text-xs text-muted-foreground mt-1">Enable AI voice outreach</p>
                  </div>
                  <Switch defaultChecked={editingCampaign.voiceEnabled} />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border">
                  <div>
                    <Label className="font-semibold text-sm">SMS messages</Label>
                    <p className="text-xs text-muted-foreground mt-1">Enable SMS nudges</p>
                  </div>
                  <Switch defaultChecked={editingCampaign.smsEnabled} />
                </div>
                
                <div className="space-y-2">
                  <Label>Max voice attempts</Label>
                  <Input type="number" defaultValue={editingCampaign.voiceAttempts} />
                </div>
                <div className="space-y-2">
                  <Label>Max SMS attempts</Label>
                  <Input type="number" defaultValue={editingCampaign.smsAttempts} />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label>Call window</Label>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Input type="time" defaultValue="09:00" className="w-[120px]" />
                      <span>to</span>
                      <Input type="time" defaultValue="18:00" className="w-[120px]" />
                    </div>
                    <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-md border border-border">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                        <div key={day} className="px-3 py-1 bg-white shadow-sm rounded text-xs font-medium text-foreground">{day}</div>
                      ))}
                      {['Sat', 'Sun'].map(day => (
                        <div key={day} className="px-3 py-1 rounded text-xs font-medium text-muted-foreground">{day}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Voice agent */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-4 border-b border-border pb-2">Voice Agent</h3>
              <div className="flex items-end gap-4">
                <div className="space-y-2 flex-1 max-w-sm">
                  <Label>Voice selection</Label>
                  <Select defaultValue="sofia">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sofia">Sword PT-PT — Sofia (default)</SelectItem>
                      <SelectItem value="joao">Sword PT-PT — João</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="gap-2">
                  <Play className="w-4 h-4" /> Voice preview
                </Button>
              </div>
            </section>

            {/* Script & messages */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-4 border-b border-border pb-2">Script & Messages</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Opening line</Label>
                  <Textarea className="h-20" defaultValue="Bom dia, estou a ligar em nome do Centro de Oncologia dos Açores. O meu nome é Sofia. Tem um momento para falar sobre o programa de rastreio do cancro colorretal?" />
                </div>
                <div className="space-y-2">
                  <Label>Main ask</Label>
                  <Textarea className="h-20" defaultValue="Gostaríamos de convidá-lo(a) a participar no programa de rastreio do cancro colorretal. É simples, gratuito e pode ser feito em casa." />
                </div>
                
                <div className="space-y-2">
                  <Label>Objection handlers</Label>
                  <Accordion type="single" collapsible className="w-full bg-white border border-border rounded-lg">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/30">"Não tenho tempo"</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground bg-muted/10">
                        O kit pode ser usado em casa, ao seu ritmo. Demora apenas alguns minutos.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/30">"Estou bem, não preciso"</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground bg-muted/10">
                        O rastreio deteta problemas antes de ter sintomas. É exatamente para pessoas que se sentem bem.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/30">"Já fiz"</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground bg-muted/10">
                        Pode confirmar a data? Se foi há mais de 2 anos, pode ser elegível de novo.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-b-0">
                      <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/30">"Faço depois"</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground bg-muted/10">
                        Posso ajudá-lo(a) a marcar agora — é mais fácil do que parece.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="space-y-2 pt-2">
                  <Label>SMS template</Label>
                  <Textarea className="h-20" defaultValue="Bom dia! O Centro de Oncologia dos Açores convidou-o(a) para o programa de rastreio. Clique aqui para mais informações: [link]" />
                </div>
              </div>
            </section>

            {/* Persuasion principles */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-4 border-b border-border pb-2">Persuasion Principles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Authority", desc: '"On behalf of [Institution]"', on: true },
                  { name: "Social Proof", desc: '"Most people in your area..."', on: true },
                  { name: "Reciprocity", desc: "Value before ask", on: true },
                  { name: "Commitment & Consistency", desc: "Micro-commitment opening", on: true },
                  { name: "Loss aversion", desc: "Scarcity framing on objection", on: true },
                  { name: "Unity", desc: "Community framing", on: false },
                ].map(principle => (
                  <div key={principle.name} className={`flex items-center justify-between p-4 rounded-lg border ${principle.on ? 'border-primary/30 bg-primary/[0.02] border-l-4 border-l-primary' : 'border-border bg-white'}`}>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{principle.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{principle.desc}</div>
                    </div>
                    <Switch defaultChecked={principle.on} />
                  </div>
                ))}
              </div>
            </section>

            {/* Failure thresholds */}
            <section>
              <h3 className="text-base font-semibold text-foreground mb-4 border-b border-border pb-2">Failure Thresholds</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                <div className="space-y-2">
                  <Label>Min connect rate (%)</Label>
                  <Input type="number" defaultValue="50" />
                </div>
                <div className="space-y-2">
                  <Label>Max opt-out rate (%)</Label>
                  <Input type="number" defaultValue="15" />
                </div>
              </div>
            </section>

          </div>
          
          <div className="p-6 bg-muted/30 border-t border-border mt-4">
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white h-12 text-base font-semibold">
              Save changes
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
