import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { InfoTooltip } from "../InfoTooltip";
import { WizardData, calculateMetrics } from "@/types/wizard";
import { TrendingDown, DollarSign, ShoppingCart } from "lucide-react";

interface Step2Props {
  data: WizardData;
  onChange: (updates: Partial<WizardData>) => void;
}

export function Step2UnsoldDestination({ data, onChange }: Step2Props) {
  const metrics = calculateMetrics(data);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Where Do the Unsold Go?</h2>
        <p className="text-muted-foreground">These aren't tire-kickers—they came to buy</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">The Market Reality</CardTitle>
          <CardDescription>What happens to customers who leave without buying?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="flex items-center flex-wrap">
              What % of your unsold customers will buy a vehicle somewhere in the next 90 days?
              <InfoTooltip content="Studies show 85% of dealership visitors buy within 90 days. The only question is where." />
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[data.buyElsewherePercent]}
                onValueChange={([value]) => onChange({ buyElsewherePercent: value })}
                min={0}
                max={100}
                step={5}
                className="flex-1"
              />
              <span className="text-2xl font-bold text-primary w-16 text-right">{data.buyElsewherePercent}%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="pt-6 text-center">
            <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-destructive" />
            <p className="text-sm text-muted-foreground">Will Buy From Competitor</p>
            <p className="text-4xl font-bold text-destructive">{metrics.buyingElsewhere.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">customers</p>
          </CardContent>
        </Card>

        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="pt-6 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-destructive" />
            <p className="text-sm text-muted-foreground">Estimated Lost Gross</p>
            <p className="text-4xl font-bold text-destructive">${metrics.estimatedLostGross.toLocaleString()}<span className="text-lg font-normal">/mo</span></p>
            <p className="text-xs text-muted-foreground mt-1">walking out the door</p>
            <p className="text-lg font-semibold text-destructive mt-2">${(metrics.estimatedLostGross * 12).toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/year</span></p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-accent/50 border-accent">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <TrendingDown className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-foreground">
              You invested to get <span className="font-bold">{metrics.unsoldCustomers.toLocaleString()}</span> people on your lot. 
              <span className="font-bold text-destructive"> {metrics.buyingElsewhere.toLocaleString()}</span> of them are about to buy from someone else.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground italic text-center">
            "If they weren't buyers, why did they spend 2 hours at your dealership?"
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
