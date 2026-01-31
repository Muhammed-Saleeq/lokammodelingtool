import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { InfoTooltip } from "../InfoTooltip";
import { WizardData, calculateMetrics } from "@/types/wizard";
import { Phone, Clock, AlertTriangle, Brain, UserX, DollarSign, XCircle } from "lucide-react";

interface Step3Props {
  data: WizardData;
  onChange: (updates: Partial<WizardData>) => void;
}

export function Step3CurrentFollowUp({ data, onChange }: Step3Props) {
  const metrics = calculateMetrics(data);
  const missedCalls = metrics.unsoldCustomers - metrics.currentFollowUpCalls;
  const costOfInaction = Math.round(metrics.estimatedLostGross * (1 - data.followUpPercent / 100));

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">The Uncomfortable Truth</h2>
        <p className="text-muted-foreground">What dealer would agree that anything less than 80-90% follow-up attempts is acceptable?</p>
      </div>

      <Card className="border-destructive/50 bg-destructive/10">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Reality Check: Your Follow-Up Rate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="flex items-center flex-wrap text-foreground">
              What % of your unsold customers get a follow-up call within 48 hours?
              <InfoTooltip content="Be brutally honest. Most stores are under 10%. Would you accept this from any other part of your business?" />
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[data.followUpPercent]}
                onValueChange={([value]) => onChange({ followUpPercent: value })}
                min={0}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-3xl font-bold text-destructive w-20 text-right">{data.followUpPercent}%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0% - Unacceptable</span>
              <span>80-90%+ - Industry standard</span>
            </div>
          </div>
          
          {data.followUpPercent < 80 && (
            <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-4 text-center">
              <p className="text-destructive font-semibold text-lg">
                {data.followUpPercent < 30 ? "🚨 Critical Gap" : data.followUpPercent < 50 ? "⚠️ Significant Gap" : "📉 Below Standard"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {100 - data.followUpPercent}% of your unsold traffic gets zero follow-up. Zero chance to recover.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6 text-center">
            <Phone className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Calls Actually Made</p>
            <p className="text-4xl font-bold text-foreground">{metrics.currentFollowUpCalls.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">of {metrics.unsoldCustomers.toLocaleString()} unsold</p>
          </CardContent>
        </Card>

        <Card className="bg-destructive/10 border-destructive/30">
          <CardContent className="pt-6 text-center">
            <XCircle className="h-8 w-8 mx-auto mb-2 text-destructive" />
            <p className="text-sm text-muted-foreground">Customers Never Called</p>
            <p className="text-4xl font-bold text-destructive">{missedCalls.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">walked away with zero outreach</p>
          </CardContent>
        </Card>
      </div>

      {/* Cost of Excuses Section */}
      <Card className="bg-gradient-to-br from-destructive/20 to-destructive/5 border-destructive/40">
        <CardHeader>
          <CardTitle className="text-xl text-center text-destructive flex items-center justify-center gap-2">
            <DollarSign className="h-6 w-6" />
            The Cost of Excuses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-5xl font-bold text-destructive mb-2">
            ${costOfInaction.toLocaleString()}<span className="text-lg font-normal">/mo</span>
          </p>
          <p className="text-center text-muted-foreground mb-6">
            This is what you're leaving on the table by not following up
          </p>
          
          <div className="space-y-4">
            <div className="bg-card/50 border border-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">"We're understaffed"</p>
                  <p className="text-sm text-muted-foreground">
                    Then hire help—or accept that understaffing is a choice that costs you deals every single month.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 border border-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <UserX className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">"They're just shoppers" / "They're mooches"</p>
                  <p className="text-sm text-muted-foreground">
                    The same person who didn't close the deal is now deciding who's worth calling? That's caller bias—and it's costing you.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 border border-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">"New UPs are the priority"</p>
                  <p className="text-sm text-muted-foreground">
                    So you invest to bring customers in, then abandon them the second they walk out? That's wasted marketing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-secondary/50 border-primary/30">
        <CardContent className="pt-6">
          <p className="text-center text-foreground text-lg font-medium">
            Most stores call fewer than <span className="text-destructive font-bold">10%</span> of unsold traffic.
          </p>
          <p className="text-center text-muted-foreground mt-2">
            No dealership we've met calls <span className="font-bold text-foreground">100%</span> of their unsold customers to find out why they left.
          </p>
          <p className="text-center text-primary font-semibold mt-4">
            Would you accept 10% effort from any other department?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
