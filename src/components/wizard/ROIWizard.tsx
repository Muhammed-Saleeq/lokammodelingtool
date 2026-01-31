import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WizardProgress } from "./WizardProgress";
import { Step1Baseline } from "./steps/Step1Baseline";
import { Step2UnsoldDestination } from "./steps/Step2UnsoldDestination";
import { Step3CurrentFollowUp } from "./steps/Step3CurrentFollowUp";
import { Step4AIFunnel } from "./steps/Step4AIFunnel";
import { Step5Financials } from "./steps/Step5Financials";
import { Step6Results } from "./steps/Step6Results";
import { WizardData, defaultWizardData, calculateMetrics } from "@/types/wizard";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  };

  const handleExportPDF = () => {
    const metrics = calculateMetrics(data);
    
    // Create a printable content div
    const printContent = `
      <html>
        <head>
          <title>Desklog Recovery ROI Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { color: #1a1a2e; border-bottom: 3px solid #4f46e5; padding-bottom: 10px; }
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
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <h1>🚗 Desklog Recovery ROI Report</h1>
          
          <div class="hero">
            <p>Your Monthly Opportunity</p>
            <div class="big-number">$${metrics.netMonthlyProfit.toLocaleString()}</div>
            <p>net profit per month | ${metrics.roi.toFixed(1)}x ROI | $${metrics.annualImpact.toLocaleString()}/year</p>
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
            <p><strong>These are YOUR numbers. Your close rate. Your gross. Your opportunity.</strong></p>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Desklog Recovery ROI Calculator
          </h1>
          <p className="text-center text-primary-foreground/80 mt-2">
            Discover the hidden revenue in your unsold traffic
          </p>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <WizardProgress 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          stepTitles={STEP_TITLES}
        />
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 pb-8">
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
    </div>
  );
}
