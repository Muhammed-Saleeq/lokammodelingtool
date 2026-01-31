import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WizardProgress } from "./WizardProgress";
import { Step1Baseline } from "./steps/Step1Baseline";
import { Step2UnsoldDestination } from "./steps/Step2UnsoldDestination";
import { Step3CurrentFollowUp } from "./steps/Step3CurrentFollowUp";
import { Step4AIFunnel } from "./steps/Step4AIFunnel";
import { Step5Financials } from "./steps/Step5Financials";
import { Step6Results } from "./steps/Step6Results";
import { LokamLogo } from "@/components/LokamLogo";
import { WizardData, defaultWizardData, calculateMetrics } from "@/types/wizard";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STEP_TITLES = [
  "Your Dealership",
  "Unsold Destination",
  "Current Follow-Up",
  "AI Recovery",
  "Financials",
  "Results"
];

export function ROIWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<WizardData>(defaultWizardData);
  const { toast } = useToast();

  const totalSteps = 6;

  const handleDataChange = (updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setData(defaultWizardData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast({
      title: "Calculator Reset",
      description: "All values have been reset to defaults.",
    });
  };

  const handleExportPDF = () => {
    const metrics = calculateMetrics(data);
    
    // Create a printable content div
    const printContent = `
      <html>
        <head>
          <title>lokam.ai - Desklog Recovery ROI Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 3px solid #4f46e5; }
            .logo { font-size: 28px; font-weight: bold; color: #4f46e5; }
            .contact-info { text-align: right; font-size: 12px; color: #666; }
            h1 { color: #1a1a2e; margin-top: 0; }
            h2 { color: #4f46e5; margin-top: 30px; }
            .hero { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 20px 0; }
            .hero .big-number { font-size: 48px; font-weight: bold; margin: 10px 0; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            .card { background: #f5f5f5; padding: 20px; border-radius: 8px; }
            .card h3 { margin: 0 0 10px 0; color: #666; font-size: 14px; }
            .card .value { font-size: 24px; font-weight: bold; color: #1a1a2e; }
            .funnel { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .funnel-step { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd; }
            .funnel-step:last-child { border-bottom: none; font-weight: bold; color: #4f46e5; }
            .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            .comparison > div { padding: 20px; border-radius: 8px; text-align: center; }
            .do-nothing { background: #f5f5f5; color: #666; }
            .with-ai { background: #4f46e5; color: white; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #4f46e5; text-align: center; }
            .footer .logo { margin-bottom: 10px; }
            .footer .tagline { color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">lokam.ai</div>
              <h1>🚗 Desklog Recovery ROI Report</h1>
            </div>
            <div class="contact-info">
              <p>hello@lokam.ai</p>
              <p>(800) 555-1234</p>
              <p>www.lokam.ai</p>
            </div>
          </div>
          
          <div class="hero">
            <p>Your Monthly Opportunity</p>
            <div class="big-number">$${metrics.additionalGrossProfit.toLocaleString()}</div>
            <p>additional gross profit per month | ${metrics.roi.toFixed(1)}x ROI | $${metrics.annualImpact.toLocaleString()}/year</p>
          </div>

          <h2>📊 Your Inputs</h2>
          <div class="grid">
            <div class="card">
              <h3>Monthly UPs</h3>
              <div class="value">${data.monthlyUps.toLocaleString()}</div>
            </div>
            <div class="card">
              <h3>Current Close Rate</h3>
              <div class="value">${data.closeRate}%</div>
            </div>
            <div class="card">
              <h3>Buy Elsewhere %</h3>
              <div class="value">${data.buyElsewherePercent}%</div>
            </div>
            <div class="card">
              <h3>Gross Profit/Deal</h3>
              <div class="value">$${data.grossProfit.toLocaleString()}</div>
            </div>
          </div>

          <h2>📈 AI Recovery Funnel</h2>
          <div class="funnel">
            <div class="funnel-step">
              <span>Unsold Customers</span>
              <span>${metrics.unsoldCustomers.toLocaleString()}</span>
            </div>
            <div class="funnel-step">
              <span>AI Reached (${data.aiReachPercent}%)</span>
              <span>${metrics.aiReached.toLocaleString()}</span>
            </div>
            <div class="funnel-step">
              <span>Appointments Booked (${data.appointmentPercent}%)</span>
              <span>${metrics.appointmentsBooked.toLocaleString()}</span>
            </div>
            <div class="funnel-step">
              <span>Showed Up (${data.showRate}%)</span>
              <span>${metrics.appointmentsShowed.toLocaleString()}</span>
            </div>
            <div class="funnel-step">
              <span>Additional Sales (${data.returnCloseRate}%)</span>
              <span>${metrics.additionalSales}</span>
            </div>
          </div>

          <h2>💰 Financial Impact</h2>
          <div class="comparison">
            <div class="do-nothing">
              <h3>Do Nothing</h3>
              <p style="font-size: 32px; font-weight: bold;">$0</p>
              <p>recovered profit</p>
            </div>
            <div class="with-ai">
              <h3>With AI Agent</h3>
              <p style="font-size: 32px; font-weight: bold;">$${metrics.netMonthlyProfit.toLocaleString()}</p>
              <p>monthly profit</p>
            </div>
          </div>

          <div class="grid">
            <div class="card">
              <h3>Additional Units/Month</h3>
              <div class="value">${metrics.additionalSales}</div>
            </div>
            <div class="card">
              <h3>Additional Gross</h3>
              <div class="value">$${metrics.additionalGrossProfit.toLocaleString()}</div>
            </div>
            <div class="card">
              <h3>Tool Cost</h3>
              <div class="value">$${data.toolCost.toLocaleString()}</div>
            </div>
            <div class="card">
              <h3>Annual Impact</h3>
              <div class="value">$${metrics.annualImpact.toLocaleString()}</div>
            </div>
          </div>

          ${data.dealerName || data.contactName ? `
          <h2>📋 Contact Information</h2>
          <div class="card">
            <p><strong>Dealership:</strong> ${data.dealerName || 'N/A'}</p>
            <p><strong>Contact:</strong> ${data.contactName || 'N/A'}</p>
            <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
            <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
          </div>
          ` : ''}

          <div class="footer">
            <div class="logo">lokam.ai</div>
            <p class="tagline">AI-powered solutions for automotive dealerships</p>
            <p style="margin-top: 15px;"><strong>These are YOUR numbers. Your close rate. Your gross. Your opportunity.</strong></p>
            <p style="color: #999; font-size: 12px; margin-top: 10px;">Generated on ${new Date().toLocaleDateString()} | hello@lokam.ai | (800) 555-1234</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }

    toast({
      title: "PDF Report Ready",
      description: "Your report is ready to print or save as PDF.",
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Baseline data={data} onChange={handleDataChange} />;
      case 2:
        return <Step2UnsoldDestination data={data} onChange={handleDataChange} />;
      case 3:
        return <Step3CurrentFollowUp data={data} onChange={handleDataChange} />;
      case 4:
        return <Step4AIFunnel data={data} onChange={handleDataChange} />;
      case 5:
        return <Step5Financials data={data} onChange={handleDataChange} />;
      case 6:
        return (
          <Step6Results 
            data={data} 
            onChange={handleDataChange} 
            onRestart={handleRestart}
            onExportPDF={handleExportPDF}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="https://lokam.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <LokamLogo className="h-16 w-auto" variant="light" />
          </a>
          <nav className="flex items-center gap-4 md:gap-6 text-sm">
            <button 
              onClick={handleRestart}
              className="flex items-center gap-1 hover:text-primary-foreground/80 transition-colors"
              title="Start Over"
            >
              <Home className="h-5 w-5" />
              <span className="hidden md:inline">Start Over</span>
            </button>
            <a href="https://lokam.ai" target="_blank" rel="noopener noreferrer" className="hidden md:block hover:text-primary-foreground/80 transition-colors">
              Website
            </a>
            <a href="mailto:founder@lokam.ai" className="hidden md:block hover:text-primary-foreground/80 transition-colors">
              Contact
            </a>
            <a href="tel:+19135132729" className="hover:text-primary-foreground/80 transition-colors">
              (913) 513-2729
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            Desklog Recovery ROI Calculator
          </h1>
          <p className="text-primary-foreground/80 mt-2">
            Discover the hidden revenue in your unsold traffic
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-4xl mx-auto px-4 py-6 w-full">
        <WizardProgress 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          stepTitles={STEP_TITLES}
        />
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 pb-8 flex-1 w-full">
        {renderStep()}

        {/* Navigation */}
        {currentStep < 6 && (
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext} className="gap-2">
              {currentStep === 5 ? "See Results" : "Next"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted border-t py-8 px-4 mt-auto">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <LokamLogo className="h-8 w-auto mb-3" variant="dark" />
              <p className="text-sm text-muted-foreground">
                AI-powered voice solutions for automotive dealerships. Boost your NPS/CSI and recover lost sales.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="mailto:founder@lokam.ai" className="block hover:text-foreground transition-colors">
                  📧 founder@lokam.ai
                </a>
                <a href="tel:+19135132729" className="block hover:text-foreground transition-colors">
                  📞 +1 (913) 513-2729
                </a>
                <a href="https://lokam.ai" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">
                  🌐 www.lokam.ai
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="https://lokam.ai" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
                <a href="https://calendly.com/saleeq-lokam/30-minutes-meeting-1" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Book a Demo
                </a>
                <a href="mailto:founder@lokam.ai" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} lokam.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
