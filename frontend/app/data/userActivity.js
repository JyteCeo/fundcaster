// Placeholder mock data for the user dashboard (app/dashboard/page.js).
//
// There is no per-user tracking in the FundMe contract yet (no contribution,
// watchlist, or campaign-creation ledger keyed by address), so this file
// stands in for that until the contract supports it. Replace with on-chain
// reads (contract events / a subgraph) once available. Ids below reference
// real projects in app/data/projects.js.

export const mockContributions = [
  { projectId: 1, amount: '3.0', date: '2026-08-28' },
  { projectId: 4, amount: '1.5', date: '2026-08-20' },
  { projectId: 8, amount: '5.0', date: '2026-05-30' },
  { projectId: 10, amount: '2.0', date: '2026-04-20' },
];

export const watchlistProjectIds = [2, 5, 7];

export const createdProjectIds = [0];
