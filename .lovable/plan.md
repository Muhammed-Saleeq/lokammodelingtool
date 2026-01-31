
# Add Hover Effects to "Beyond the Numbers" Containers

## Summary
Add interactive hover effects to all insight containers in the "Beyond the Numbers" section for better visual feedback when users scroll over them.

## Current Issue
- The user sees 52% for appointment booking rate, but the default is already 55% - this was manually changed
- The "Beyond the Numbers" containers lack hover/highlight effects

## Changes

### File: `src/components/wizard/steps/Step4AIFunnel.tsx`

Update each container div (lines 206-220) from:
```
bg-card/50 border border-border rounded-lg p-3
```

To:
```
bg-card/50 border border-border rounded-lg p-3 
transition-all duration-200 cursor-pointer
hover:scale-[1.02] hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg
```

### Hover Effects Applied:
- Subtle scale up (1.02x) on hover
- Background shifts to primary color tint
- Border highlights with primary color
- Shadow appears for depth
- Smooth 200ms transition animation
- Cursor changes to pointer for interactivity feel

### Containers Affected (5 total):
1. "Undervaluing trade-ins"
2. "Unreasonable finance rates"  
3. "Hard-sell managers pushing customers away"
4. "Salespeople who don't know the product"
5. "A team that's unengaged" (spans 2 columns)

All containers will receive identical hover treatment for consistency.

## Note on Default Value
The appointment percent default is already 55% in `src/types/wizard.ts` (line 38). If you're seeing 52%, that means it was manually adjusted during your session. The default is correct.
