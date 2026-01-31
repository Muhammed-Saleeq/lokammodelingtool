import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoTooltip } from "../InfoTooltip";
import { WizardData, calculateMetrics } from "@/types/wizard";
import { DollarSign, TrendingUp, Calculator, Percent } from "lucide-react";

interface Step5Props {
  data: WizardData;
  onChange: (updates: Partial<WizardData>) => void;
}

export function Step5Financials({ data, onChange }: Step5Props) {
  const metrics = calculateMetrics(data);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">The Money</h2>
        <p className="text-muted-foreground">Let the numbers speak for themselves</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Numbers</CardTitle>
          <CardDescription>Input your dealership's actual gross profit figures</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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

          <div className="space-y-2">
            <Label htmlFor="toolCost" className="flex items-center">
              AI Agent Monthly Cost
              <InfoTooltip content="Monthly investment for the AI calling agent" />
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="toolCost"
                type="number"
                value={data.toolCost}
                onChange={(e) => onChange({ toolCost: parseInt(e.target.value) || 0 })}
                onFocus={(e) => e.target.select()}
                className="pl-8 text-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Additional Units/Month</p>
            <p className="text-4xl font-bold text-primary">{metrics.additionalSales}</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="pt-6 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Additional Gross Profit</p>
            <p className="text-4xl font-bold text-primary">${metrics.additionalGrossProfit.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tool Investment</p>
              <p className="text-2xl font-bold text-foreground">${data.toolCost.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Net Monthly Profit</p>
              <p className={`text-3xl font-bold ${metrics.netMonthlyProfit >= 0 ? 'text-primary' : 'text-destructive'}`}>
                ${metrics.netMonthlyProfit.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">ROI</p>
              <p className="text-3xl font-bold text-primary">{metrics.roi.toFixed(1)}x</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary text-primary-foreground">
        <CardContent className="pt-6 text-center">
          <Calculator className="h-10 w-10 mx-auto mb-3 opacity-80" />
          <p className="text-sm opacity-80 mb-2">Annual Impact</p>
          <p className="text-5xl font-bold">${metrics.annualImpact.toLocaleString()}</p>
          <p className="text-sm opacity-80 mt-2">additional profit per year</p>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-center">Side-by-Side Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4 text-center">
              <h4 className="font-semibold text-muted-foreground mb-4">Do Nothing</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Recovered Sales</p>
                  <p className="text-2xl font-bold text-muted-foreground">0</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Additional Profit</p>
                  <p className="text-2xl font-bold text-muted-foreground">$0</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-4 text-center border-2 border-primary">
              <h4 className="font-semibold text-primary mb-4">With AI Agent</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Recovered Sales</p>
                  <p className="text-2xl font-bold text-primary">{metrics.additionalSales}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Net Profit</p>
                  <p className="text-2xl font-bold text-primary">${metrics.netMonthlyProfit.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-accent/50 border-accent">
        <CardContent className="pt-6">
          <p className="text-center text-foreground font-medium">
            These are <span className="text-primary">your numbers</span>. Your close rate. Your gross. Your opportunity.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
