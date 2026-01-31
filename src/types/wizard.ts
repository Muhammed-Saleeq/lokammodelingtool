export interface WizardData {
  // Step 1: Dealership Baseline
  monthlyUps: number;
  closeRate: number;

  // Step 2: Where Do Unsold Go
  buyElsewherePercent: number;

  // Step 3: Current Follow-Up
  followUpPercent: number;
  connectPercent: number;

  // Step 4: AI Agent Funnel
  aiReachPercent: number;
  appointmentPercent: number;
  showRate: number;
  returnCloseRate: number;

  // Step 5: Financials
  grossProfit: number;
  toolCost: number;

  // Step 6: Lead Capture
  dealerName: string;
  contactName: string;
  email: string;
  phone: string;
  wantsMoreInfo: boolean;
}

export const defaultWizardData: WizardData = {
  monthlyUps: 0,
  closeRate: 27,
  buyElsewherePercent: 50,
  followUpPercent: 9,
  connectPercent: 25,
  aiReachPercent: 55,
  appointmentPercent: 55,
  showRate: 55,
  returnCloseRate: 27,
  grossProfit: 0,
  toolCost: 0,
  dealerName: '',
  contactName: '',
  email: '',
  phone: '',
  wantsMoreInfo: false,
};

export interface CalculatedMetrics {
  customersClosed: number;
  unsoldCustomers: number;
  buyingElsewhere: number;
  estimatedLostGross: number;
  currentFollowUpCalls: number;
  currentConnections: number;
  aiReached: number;
  appointmentsBooked: number;
  appointmentsShowed: number;
  additionalSales: number;
  additionalGrossProfit: number;
  netMonthlyProfit: number;
  roi: number;
  annualImpact: number;
}

export function calculateMetrics(data: WizardData): CalculatedMetrics {
  const customersClosed = Math.round(data.monthlyUps * (data.closeRate / 100));
  const unsoldCustomers = data.monthlyUps - customersClosed;
  const buyingElsewhere = Math.round(unsoldCustomers * (data.buyElsewherePercent / 100));
  const estimatedLostGross = buyingElsewhere * data.grossProfit;

  const currentFollowUpCalls = Math.round(unsoldCustomers * (data.followUpPercent / 100));
  const currentConnections = Math.round(currentFollowUpCalls * (data.connectPercent / 100));

  const aiReached = Math.round(unsoldCustomers * (data.aiReachPercent / 100));
  const appointmentsBooked = Math.round(aiReached * (data.appointmentPercent / 100));
  const appointmentsShowed = Math.round(appointmentsBooked * (data.showRate / 100));
  const additionalSales = Math.round(appointmentsShowed * (data.returnCloseRate / 100));

  const additionalGrossProfit = additionalSales * data.grossProfit;
  const netMonthlyProfit = additionalGrossProfit - data.toolCost;
  const roi = data.toolCost > 0 ? additionalGrossProfit / data.toolCost : 0;
  const annualImpact = netMonthlyProfit * 12;

  return {
    customersClosed,
    unsoldCustomers,
    buyingElsewhere,
    estimatedLostGross,
    currentFollowUpCalls,
    currentConnections,
    aiReached,
    appointmentsBooked,
    appointmentsShowed,
    additionalSales,
    additionalGrossProfit,
    netMonthlyProfit,
    roi,
    annualImpact,
  };
}
