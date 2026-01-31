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
              <InfoTooltip content="These are be-backs—customers who already visited. Apply your normal schedule rate here, which should be 50-55% of contacted customers." />
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
              <div className="bg-muted rounded-lg p-4 text-center transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-accent hover:brightness-125 hover:shadow-lg hover:shadow-muted/50">
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">Unsold Customers</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{metrics.unsoldCustomers.toLocaleString()}</p>
              </div>
              
              <div className="flex justify-center my-2">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="bg-primary/10 rounded-lg p-4 text-center mx-4 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-primary/30 hover:brightness-125 hover:shadow-lg hover:shadow-primary/30">
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <Bot className="h-4 w-4" />
                  <span className="text-sm">AI Reached ({data.aiReachPercent}%)</span>
                </div>
                <p className="text-3xl font-bold text-primary">{metrics.aiReached.toLocaleString()}</p>
              </div>

              <div className="flex justify-center my-2">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="bg-primary/20 rounded-lg p-4 text-center mx-8 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-primary/40 hover:brightness-125 hover:shadow-lg hover:shadow-primary/40">
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Appointments ({data.appointmentPercent}%)</span>
                </div>
                <p className="text-3xl font-bold text-primary">{metrics.appointmentsBooked.toLocaleString()}</p>
              </div>

              <div className="flex justify-center my-2">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="bg-primary/30 rounded-lg p-4 text-center mx-12 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-primary/50 hover:brightness-125 hover:shadow-lg hover:shadow-primary/50">
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <UserCheck className="h-4 w-4" />
                  <span className="text-sm">Showed Up ({data.showRate}%)</span>
                </div>
                <p className="text-3xl font-bold text-primary">{metrics.appointmentsShowed.toLocaleString()}</p>
              </div>

              <div className="flex justify-center my-2">
                <ArrowDown className="h-6 w-6 text-primary" />
              </div>

              <div className="bg-primary rounded-lg p-4 text-center mx-16 transition-all duration-200 cursor-pointer hover:scale-[1.03] hover:brightness-125 hover:shadow-xl hover:shadow-primary/50">
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

      {/* Non-Financial Benefits */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg text-center">Beyond the Numbers: What You'll Discover</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center mb-6">
            These issues are costing you money every month—but no one is telling your team because there's no evidence. <span className="text-foreground font-semibold">That ends now.</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trade-in Issues */}
            <div className="bg-card border border-border rounded-xl p-4 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <h4 className="font-semibold text-foreground">Undervaluing Trade-Ins</h4>
                  <p className="text-sm text-muted-foreground mt-1">Discover when appraisals are pushing customers to competitors</p>
                </div>
              </div>
            </div>

            {/* Finance Issues */}
            <div className="bg-card border border-border rounded-xl p-4 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-semibold text-foreground">Unreasonable Finance Rates</h4>
                  <p className="text-sm text-muted-foreground mt-1">Find out when F&I is losing deals over rate objections</p>
                </div>
              </div>
            </div>

            {/* Hard-Sell Managers */}
            <div className="bg-card border border-border rounded-xl p-4 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">😤</span>
                <div>
                  <h4 className="font-semibold text-foreground">Hard-Sell Managers</h4>
                  <p className="text-sm text-muted-foreground mt-1">Learn when aggressive tactics are pushing customers away</p>
                </div>
              </div>
            </div>

            {/* Product Knowledge */}
            <div className="bg-card border border-border rounded-xl p-4 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❓</span>
                <div>
                  <h4 className="font-semibold text-foreground">Product Knowledge Gaps</h4>
                  <p className="text-sm text-muted-foreground mt-1">Identify salespeople who can't answer customer questions</p>
                </div>
              </div>
            </div>

            {/* Price Objections */}
            <div className="bg-card border border-border rounded-xl p-4 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏷️</span>
                <div>
                  <h4 className="font-semibold text-foreground">Price Negotiation Patterns</h4>
                  <p className="text-sm text-muted-foreground mt-1">Understand where price objections are really coming from</p>
                </div>
              </div>
            </div>

            {/* Timing Issues */}
            <div className="bg-card border border-border rounded-xl p-4 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <h4 className="font-semibold text-foreground">Timing & Availability</h4>
                  <p className="text-sm text-muted-foreground mt-1">Spot when customers couldn't get help or waited too long</p>
                </div>
              </div>
            </div>

            {/* Inventory Issues */}
            <div className="bg-card border border-border rounded-xl p-4 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚗</span>
                <div>
                  <h4 className="font-semibold text-foreground">Inventory & Selection</h4>
                  <p className="text-sm text-muted-foreground mt-1">Know when you're losing deals due to stock issues</p>
                </div>
              </div>
            </div>

            {/* Department Communication */}
            <div className="bg-card border border-border rounded-xl p-4 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔗</span>
                <div>
                  <h4 className="font-semibold text-foreground">Department Breakdowns</h4>
                  <p className="text-sm text-muted-foreground mt-1">Uncover communication gaps between sales, F&I, and service</p>
                </div>
              </div>
            </div>

            {/* Unengaged Team - Full Width */}
            <div className="bg-card border border-border rounded-xl p-4 md:col-span-2 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">😴</span>
                <div>
                  <h4 className="font-semibold text-foreground">Unengaged Team Culture</h4>
                  <p className="text-sm text-muted-foreground mt-1">Reveal when your team has become order-takers instead of a true sales department—and fix it</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-primary font-semibold mt-6">
            Your team will discover the real reasons deals are walking out—and take corrective action to improve and succeed.
          </p>
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

      <div className="text-center pt-4 pb-2">
        <p className="text-primary font-semibold text-lg">
          👉 Continue to the next step to see your ROI and monthly impact
        </p>
      </div>
    </div>
  );
}
