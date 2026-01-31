

# Update Step 2 Timeframe and Soften Tooltip

## Summary
Update the buying timeframe from 90 days to 60 days and soften the tooltip language with a Cox Automotive reference.

## Changes

**File: `src/components/wizard/steps/Step2UnsoldDestination.tsx`**

### Line 31 - Slider Label
**Current:** "What % of your unsold customers will buy a vehicle somewhere in the next 90 days?"

**Updated:** "What % of your unsold customers will buy a vehicle somewhere in the next 60 days?"

### Line 32 - Tooltip
**Current:** "Studies show 85% of dealership visitors buy within 90 days. The only question is where."

**Updated:** "According to Cox Automotive research, most shoppers complete their purchase within 60 days. The only question is where."

## Why This Works
- 60-day window is more defensible and creates urgency
- Cox Automotive attribution adds credibility without overstating specific percentages
- "Most shoppers" is softer than claiming a specific 85% figure

