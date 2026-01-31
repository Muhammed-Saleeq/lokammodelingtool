import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { InfoTooltip } from "../InfoTooltip";
import { WizardData, calculateMetrics } from "@/types/wizard";
import { Bot, Phone, Calendar, UserCheck, Trophy, ArrowDown } from "lucide-react";

interface Step4Props {
  data: WizardData;
  onChange: (updates: Partial<WizardData>) => void;
}

export function Step4AIFunnel({ data, onChange }: Step4Props) {
  const metrics = calculateMetrics(data);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">What If You Called Everyone?</h2>
        <p className="text-muted-foreground">Model the possibility with an AI agent that never takes a day off</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Agent Recovery Model
          </CardTitle>
          <CardDescription>Adjust these numbers based on what you think is realistic</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <Label className="flex items-center flex-wrap">
              % of unsold customers reached by AI
              <InfoTooltip content="Our service dialer achieves a 70-75% reach rate by calling at optimal times, leaving voicemails, and sending texts. No lunch breaks, no days off." />
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[data.aiReachPercent]}
                onValueChange={([value]) => onChange({ aiReachPercent: value })}
                min={0}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-2xl font-bold text-primary w-16 text-right">{data.aiReachPercent}%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center flex-wrap">
              % of reached who book an appointment
              <InfoTooltip content="These are be-backs—customers who already visited. Apply your normal schedule rate here, which should be at least 60% of contacted customers." />
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[data.appointmentPercent]}
                onValueChange={([value]) => onChange({ appointmentPercent: value })}
                min={0}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-2xl font-bold text-primary w-16 text-right">{data.appointmentPercent}%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center flex-wrap">
              Appointment show rate
              <InfoTooltip content="Use your current show rate here—but it should be no less than 50-55%. They agreed to come back, so they're motivated." />
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[data.showRate]}
                onValueChange={([value]) => onChange({ showRate: value })}
                min={0}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-2xl font-bold text-primary w-16 text-right">{data.showRate}%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center flex-wrap">
              Close rate on returners
              <InfoTooltip content="Is it logical to assume this will be lower, the same, or higher? It certainly won't be lower—so apply the same or higher. In most cases it will be well above your normal close rate. These people are coming back to buy, not visit." />
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[data.returnCloseRate]}
                onValueChange={([value]) => onChange({ returnCloseRate: value })}
                min={0}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-2xl font-bold text-primary w-16 text-right">{data.returnCloseRate}%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
            {data.returnCloseRate >= data.closeRate && (
              <p className="text-sm text-primary font-medium">
                Smart thinking—they came back for a reason.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Visual Funnel */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-lg text-center">Your Recovery Funnel</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-full max-w-md">
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">Unsold Customers</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{metrics.unsoldCustomers.toLocaleString()}</p>
              </div>
              
              <div className="flex justify-center my-2">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="bg-primary/10 rounded-lg p-4 text-center mx-4">
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <Bot className="h-4 w-4" />
                  <span className="text-sm">AI Reached ({data.aiReachPercent}%)</span>
                </div>
                <p className="text-3xl font-bold text-primary">{metrics.aiReached.toLocaleString()}</p>
              </div>

              <div className="flex justify-center my-2">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="bg-primary/20 rounded-lg p-4 text-center mx-8">
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Appointments ({data.appointmentPercent}%)</span>
                </div>
                <p className="text-3xl font-bold text-primary">{metrics.appointmentsBooked.toLocaleString()}</p>
              </div>

              <div className="flex justify-center my-2">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="bg-primary/30 rounded-lg p-4 text-center mx-12">
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <UserCheck className="h-4 w-4" />
                  <span className="text-sm">Showed Up ({data.showRate}%)</span>
                </div>
                <p className="text-3xl font-bold text-primary">{metrics.appointmentsShowed.toLocaleString()}</p>
              </div>

              <div className="flex justify-center my-2">
                <ArrowDown className="h-6 w-6 text-primary" />
              </div>

              <div className="bg-primary rounded-lg p-4 text-center mx-16">
                <div className="flex items-center justify-center gap-2 text-primary-foreground mb-1">
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm">Additional Sales ({data.returnCloseRate}%)</span>
                </div>
                <p className="text-4xl font-bold text-primary-foreground">{metrics.additionalSales.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-accent/50 border-accent">
        <CardContent className="pt-6">
          <p className="text-center text-foreground">
            No excuses. No bias. No "they seemed like a mooch." 
            <span className="font-bold"> Just a conversation to find out what went wrong and fix it.</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
