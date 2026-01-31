import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { WizardData, calculateMetrics } from "@/types/wizard";
import { 
  FileText, 
  RefreshCw, 
  Phone, 
  Mail, 
  Building2, 
  User,
  Download,
  Trophy,
  TrendingUp,
  DollarSign,
  ArrowRight
} from "lucide-react";

interface Step6Props {
  data: WizardData;
  onChange: (updates: Partial<WizardData>) => void;
  onRestart: () => void;
  onExportPDF: () => void;
}

export function Step6Results({ data, onChange, onRestart, onExportPDF }: Step6Props) {
  const metrics = calculateMetrics(data);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Results</h2>
        <p className="text-muted-foreground">Here's what your numbers reveal</p>
      </div>

      {/* Hero Results */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-4">
            <Trophy className="h-12 w-12 mx-auto opacity-80" />
            <div>
              <p className="text-sm opacity-80">Your Monthly Opportunity</p>
              <p className="text-5xl font-bold">${metrics.netMonthlyProfit.toLocaleString()}</p>
              <p className="text-sm opacity-80 mt-1">net profit after tool cost</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-primary-foreground/20">
              <div>
                <p className="text-2xl font-bold">{metrics.additionalSales}</p>
                <p className="text-xs opacity-80">Extra Units</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{metrics.roi.toFixed(1)}x</p>
                <p className="text-xs opacity-80">ROI</p>
              </div>
              <div>
                <p className="text-2xl font-bold">${(metrics.annualImpact / 1000).toFixed(0)}K</p>
                <p className="text-xs opacity-80">Annual</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Scenario Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Scenario Summary</CardTitle>
          <CardDescription>The assumptions behind your results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground">Monthly UPs</p>
              <p className="font-bold text-lg">{data.monthlyUps.toLocaleString()}</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground">Close Rate</p>
              <p className="font-bold text-lg">{data.closeRate}%</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground">AI Reach</p>
              <p className="font-bold text-lg">{data.aiReachPercent}%</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground">Gross/Deal</p>
              <p className="font-bold text-lg">${data.grossProfit.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-3">Recovery Funnel</h4>
            <div className="flex items-center justify-between text-sm flex-wrap gap-2">
              <div className="text-center">
                <p className="text-muted-foreground text-xs">Unsold</p>
                <p className="font-bold">{metrics.unsoldCustomers}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="text-center">
                <p className="text-muted-foreground text-xs">Reached</p>
                <p className="font-bold">{metrics.aiReached}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="text-center">
                <p className="text-muted-foreground text-xs">Booked</p>
                <p className="font-bold">{metrics.appointmentsBooked}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="text-center">
                <p className="text-muted-foreground text-xs">Showed</p>
                <p className="font-bold">{metrics.appointmentsShowed}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-primary" />
              <div className="text-center bg-primary/10 rounded-lg px-3 py-1">
                <p className="text-primary text-xs">Sold</p>
                <p className="font-bold text-primary">{metrics.additionalSales}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optional Lead Capture */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Want Us to Send You This Report?
          </CardTitle>
          <CardDescription>Optional - share your info and we'll email you a detailed PDF</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dealerName" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Dealership Name
              </Label>
              <Input
                id="dealerName"
                value={data.dealerName}
                onChange={(e) => onChange({ dealerName: e.target.value })}
                placeholder="ABC Motors"
                className="capitalize"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Your Name
              </Label>
              <Input
                id="contactName"
                value={data.contactName}
                onChange={(e) => onChange({ contactName: e.target.value })}
                placeholder="John Smith"
                className="capitalize"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => onChange({ email: e.target.value })}
                placeholder="john@abcmotors.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="wantsMoreInfo"
              checked={data.wantsMoreInfo}
              onCheckedChange={(checked) => onChange({ wantsMoreInfo: checked as boolean })}
            />
            <Label htmlFor="wantsMoreInfo" className="text-sm cursor-pointer">
              I'd like to learn more about the AI agent solution
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          onClick={onExportPDF} 
          className="h-auto py-4 flex flex-col items-center gap-2"
          variant="default"
        >
          <Download className="h-6 w-6" />
          <span>Download PDF Report</span>
        </Button>

        <Button 
          onClick={onRestart} 
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2"
        >
          <RefreshCw className="h-6 w-6" />
          <span>Adjust My Numbers</span>
        </Button>

        <Button 
          variant="secondary"
          className="h-auto py-4 flex flex-col items-center gap-2"
          asChild
        >
          <a href="https://calendly.com/saleeq-lokam/30-minutes-meeting-1" target="_blank" rel="noopener noreferrer">
            <Phone className="h-6 w-6" />
            <span>Book a Demo</span>
          </a>
        </Button>
      </div>

      <Card className="bg-accent/50 border-accent">
        <CardContent className="pt-6">
          <p className="text-center text-foreground italic">
            "You already paid to get these customers through your doors. Why give them to your competitor?"
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
