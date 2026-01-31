import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { InfoTooltip } from "../InfoTooltip";
import { WizardData, calculateMetrics } from "@/types/wizard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, Clock, AlertTriangle, Brain, UserX } from "lucide-react";

interface Step3Props {
  data: WizardData;
  onChange: (updates: Partial<WizardData>) => void;
}

export function Step3CurrentFollowUp({ data, onChange }: Step3Props) {
  const metrics = calculateMetrics(data);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Current Follow-Up</h2>
        <p className="text-muted-foreground">Be honest—this is your model. Let's see the reality.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Follow-Up Reality Check</CardTitle>
          <CardDescription>What actually happens after customers leave?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <Label className="flex items-center flex-wrap">
              What % of your unsold customers get a follow-up call within 48 hours?
              <InfoTooltip content="Be honest—this is your model. Most stores are under 30%." />
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[data.followUpPercent]}
                onValueChange={([value]) => onChange({ followUpPercent: value })}
                min={0}
                max={100}
                step={5}
                className="flex-1"
              />
              <span className="text-2xl font-bold text-primary w-16 text-right">{data.followUpPercent}%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6 text-center">
          <Phone className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Calls Attempted</p>
          <p className="text-3xl font-bold text-foreground">{metrics.currentFollowUpCalls.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">of {metrics.unsoldCustomers.toLocaleString()} unsold</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Why Does Follow-Up Fail?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Why follow-up falls through the cracks
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Understaffed teams, competing priorities, new UPs walking in, no accountability system. 
                  Your team has 100 reasons not to call. The calls that don't happen cost you deals.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <UserX className="h-4 w-4 text-muted-foreground" />
                  The caller bias problem
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  The same person who didn't close the deal now calls with assumptions: "They're just shopping," 
                  "They're a mooch," "They'll never buy." Is that always true, or is your team justifying their loss?
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-muted-foreground" />
                  The customer's memory
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  They remember the experience. A fresh voice changes everything. No ego, no assumptions, 
                  no history—just a genuine conversation about what went wrong and how to fix it.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="bg-accent/50 border-accent">
        <CardContent className="pt-6">
          <p className="text-center text-foreground">
            Most stores call fewer than 10% of unsold traffic. 
            <span className="font-bold"> Zero call everyone</span> to find out why they didn't buy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
