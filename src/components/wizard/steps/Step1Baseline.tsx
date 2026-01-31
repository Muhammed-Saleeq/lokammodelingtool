import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { InfoTooltip } from "../InfoTooltip";
import { WizardData, calculateMetrics } from "@/types/wizard";
import { Users, UserCheck, UserX, DollarSign } from "lucide-react";

interface Step1Props {
  data: WizardData;
  onChange: (updates: Partial<WizardData>) => void;
}

export function Step1Baseline({ data, onChange }: Step1Props) {
  const metrics = calculateMetrics(data);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Dealership Today</h2>
        <p className="text-muted-foreground">Let's start with your current traffic and performance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Traffic</CardTitle>
          <CardDescription>How many customers walk through your doors each month?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="monthlyUps" className="flex items-center">
              Monthly UPs (Walk-in Traffic)
              <InfoTooltip content="Total customers who physically visit your dealership each month" />
            </Label>
            <Input
              id="monthlyUps"
              type="number"
              value={data.monthlyUps}
              onChange={(e) => onChange({ monthlyUps: parseInt(e.target.value) || 0 })}
              onFocus={(e) => e.target.select()}
              className="text-lg"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center">
              Current Close Rate: <span className="ml-2 font-bold text-primary">{data.closeRate}%</span>
              <InfoTooltip content="Industry average is 20-25%. Top performers hit 30%+" />
            </Label>
            <Slider
              value={[data.closeRate]}
              onValueChange={([value]) => onChange({ closeRate: value, returnCloseRate: value })}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
            {data.closeRate > 25 && (
              <p className="text-sm text-primary font-medium">That's a strong close rate! You're ahead of most dealers.</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="grossProfit" className="flex items-center">
              Average Gross Profit per Deal (Front + Back)
              <InfoTooltip content="Combined front-end and F&I gross profit per unit sold" />
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="grossProfit"
                type="number"
                value={data.grossProfit}
                onChange={(e) => onChange({ grossProfit: parseInt(e.target.value) || 0 })}
                onFocus={(e) => e.target.select()}
                className="pl-8 text-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-muted/50">
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Monthly UPs</p>
            <p className="text-3xl font-bold text-foreground">{data.monthlyUps.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="pt-6 text-center">
            <UserCheck className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Customers Closed</p>
            <p className="text-3xl font-bold text-primary">{metrics.customersClosed.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="pt-6 text-center">
            <UserX className="h-8 w-8 mx-auto mb-2 text-destructive" />
            <p className="text-sm text-muted-foreground">Unsold Customers</p>
            <p className="text-3xl font-bold text-destructive">{metrics.unsoldCustomers.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-accent/50 border-accent">
        <CardContent className="pt-6">
          <p className="text-center text-foreground">
            Nice work getting <span className="font-bold">{data.monthlyUps.toLocaleString()}</span> customers through your doors. 
            That's real marketing dollars at work.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
