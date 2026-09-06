// Shared project data used across the application
export const projects = [
  {
    id: 0,
    title: "Web3 Edu Platform",
    description: "Web3 Edu Platform designs and develops integrated solutions for blockchain education, helping developers master smart contract development and decentralized applications.",
    raised: "12.5",
    goal: "50",
    donors: 45,
    backers: 250,
    status: "upcoming",
    imageColor: "#22d3ee",
    icon: "💎",
    isOwner: true,
    category: "EDU",
    tagline: "Hands-on courses paired with live testnets so developers learn Solidity by shipping, not just reading.",
    creator: {
      name: "Ada Chain Collective",
      address: "0x1A2b3C4d5E6f7890aBCD1234ef567890ABCdEF12",
      verified: false,
    },
    story: [
      {
        heading: "Why on-chain education needs a rebuild",
        body: "Most smart contract courses stop at theory. Web3 Edu Platform pairs every lesson with a live, sandboxed testnet so learners deploy and break real contracts from day one.",
      },
      {
        heading: "Curriculum",
        body: "Twelve modules take students from Solidity basics through gas optimization, security auditing, and full-stack dApp deployment, each capped with a graded on-chain project.",
      },
      {
        heading: "Sandboxed testnets",
        body: "Every learner gets an isolated forked testnet with pre-funded accounts, so mistakes cost nothing and feedback is immediate.",
      },
      {
        heading: "Fund allocation",
        body: "Contributions cover curriculum development, testnet infrastructure, and stipends for the first cohort of teaching assistants.",
      },
    ],
    milestones: [
      { title: "Curriculum design & pilot cohort", target: "10 ETH", status: "in-progress" },
      { title: "Public beta with 500 learners", target: "25 ETH", status: "upcoming" },
      { title: "Certification program launch", target: "50 ETH", status: "upcoming" },
    ],
    updates: [
      {
        date: "2026-08-20",
        title: "Campaign page is live",
        body: "We've opened the campaign ahead of our public launch. Early backers get lifetime access to the full curriculum.",
      },
    ],
    recentBackers: [
      { address: "0x9F1c...4Ab2", amount: "1.0", time: "2 days ago" },
      { address: "0x66Ad...9c31", amount: "0.5", time: "3 days ago" },
      { address: "0x0Bc4...77Fe", amount: "2.5", time: "5 days ago" },
    ],
    minContribution: "0.01",
    daysLeft: 24,
  },
  {
    id: 1,
    title: "DeFi Yield Optimizer",
    description: "Automated yield farming protocol that maximizes returns across multiple DeFi platforms while minimizing gas costs and risk exposure.",
    raised: "28.3",
    goal: "50",
    donors: 128,
    backers: 89,
    status: "active",
    imageColor: "#34d399",
    icon: "🚀",
    isOwner: false,
    category: "DEFI",
    tagline: "One vault that continuously reallocates capital to the safest, highest-yielding lending markets.",
    creator: {
      name: "Yield Labs",
      address: "0x2B3C4d5E6f7890ABcd1234EF567890abCDEf1234",
      verified: true,
    },
    story: [
      {
        heading: "The problem with manual yield farming",
        body: "Rates shift by the hour across lending markets, and most users leave capital parked in whichever pool they deposited into first, missing better returns elsewhere.",
      },
      {
        heading: "The strategy engine",
        body: "Our optimizer monitors rates across Aave, Compound, and Morpho, moving capital automatically whenever the gas cost is justified by the yield improvement.",
      },
      {
        heading: "Risk management",
        body: "Every supported market is scored on liquidity depth and audit history; the vault only deploys capital above a configurable risk floor.",
      },
      {
        heading: "Fund allocation",
        body: "Raised funds cover a third-party security audit, keeper infrastructure for rebalancing, and an initial insurance backstop for depositors.",
      },
    ],
    milestones: [
      { title: "Security audit", target: "15 ETH", status: "complete" },
      { title: "Mainnet vault launch", target: "30 ETH", status: "in-progress" },
      { title: "Multi-chain expansion", target: "50 ETH", status: "upcoming" },
    ],
    updates: [
      {
        date: "2026-08-28",
        title: "Audit completed with no critical findings",
        body: "Our security partner completed a two-week review of the vault contracts. The report is public and linked from the transparency panel.",
      },
      {
        date: "2026-08-14",
        title: "Testnet vault live",
        body: "The optimizer is now rebalancing on Sepolia against live rate feeds. Mainnet deployment follows once funding closes.",
      },
    ],
    recentBackers: [
      { address: "0x7cE1...2Bd9", amount: "3.0", time: "4 hours ago" },
      { address: "0x4Fa2...c810", amount: "1.2", time: "9 hours ago" },
      { address: "0xA31d...5e77", amount: "0.8", time: "1 day ago" },
    ],
    minContribution: "0.01",
    daysLeft: 18,
  },
  {
    id: 2,
    title: "NFT Marketplace",
    description: "A next-generation NFT marketplace with zero gas fees, built on Layer 2 solutions for seamless trading and minting experiences.",
    raised: "45.2",
    goal: "50",
    donors: 312,
    backers: 156,
    status: "active",
    imageColor: "#a855f7",
    icon: "⚡",
    isOwner: false,
    category: "NFT",
    tagline: "Zero gas-fee minting and trading for creators, settled in batches on a rollup.",
    creator: {
      name: "Canvas Protocol",
      address: "0x3C4D5e6F7890abCD1234ef567890ABcdEF123456",
      verified: true,
    },
    story: [
      {
        heading: "Gas fees are pricing out creators",
        body: "Minting on Ethereum mainnet can cost more than the sale itself. Canvas batches mints and trades on a rollup so creators keep what they earn.",
      },
      {
        heading: "How the rollup settles",
        body: "Trades execute instantly off-chain and settle to mainnet in batches, inheriting Ethereum's security without paying per-transaction gas.",
      },
      {
        heading: "Creator royalties",
        body: "Royalties are enforced at the protocol level rather than relying on marketplace goodwill, so creators are paid on every resale.",
      },
      {
        heading: "Fund allocation",
        body: "Remaining funds go toward rollup infrastructure costs, a creator grants program, and marketplace UI polish ahead of public launch.",
      },
    ],
    milestones: [
      { title: "Rollup integration", target: "20 ETH", status: "complete" },
      { title: "Creator royalty enforcement", target: "35 ETH", status: "complete" },
      { title: "Public marketplace launch", target: "50 ETH", status: "in-progress" },
    ],
    updates: [
      {
        date: "2026-09-01",
        title: "45 ETH raised — final stretch",
        body: "We're close to our goal. The remaining funds unlock a full security review before public launch.",
      },
      {
        date: "2026-08-22",
        title: "Royalty contract deployed to testnet",
        body: "Resale royalties are now enforced automatically. Try it on our Sepolia demo marketplace.",
      },
    ],
    recentBackers: [
      { address: "0x88Ea...31Cd", amount: "5.0", time: "1 hour ago" },
      { address: "0x12Fb...90Aa", amount: "2.0", time: "6 hours ago" },
      { address: "0xD4c7...eE21", amount: "1.5", time: "10 hours ago" },
    ],
    minContribution: "0.01",
    daysLeft: 6,
  },
  {
    id: 3,
    title: "DAO Governance Tool",
    description: "Comprehensive governance toolkit enabling DAOs to manage proposals, voting, and treasury operations with full transparency.",
    raised: "18.7",
    goal: "50",
    donors: 87,
    backers: 64,
    status: "upcoming",
    imageColor: "#f472b6",
    icon: "🛡️",
    isOwner: false,
    category: "DAO",
    tagline: "Proposal drafting, quadratic voting, and treasury reporting in one governance dashboard.",
    creator: {
      name: "Quorum Works",
      address: "0x4D5E6f7890AbCd1234Ef567890abCDEF1234567",
      verified: false,
    },
    story: [
      {
        heading: "Governance is fragmented",
        body: "Most DAOs stitch together a forum, a snapshot vote, and a multisig with no shared record. Quorum unifies proposal drafting, voting, and treasury execution.",
      },
      {
        heading: "Quadratic voting",
        body: "Vote weight scales with the square root of tokens committed, reducing the influence of any single large holder on close decisions.",
      },
      {
        heading: "Treasury reporting",
        body: "Every treasury movement is tagged to the proposal that authorized it, giving members a clear audit trail without extra tooling.",
      },
      {
        heading: "Fund allocation",
        body: "Funding covers smart contract development for on-chain execution, a security review, and onboarding support for the first ten DAOs.",
      },
    ],
    milestones: [
      { title: "Proposal & voting module", target: "18 ETH", status: "in-progress" },
      { title: "Treasury execution module", target: "35 ETH", status: "upcoming" },
      { title: "First ten DAOs onboarded", target: "50 ETH", status: "upcoming" },
    ],
    updates: [
      {
        date: "2026-08-25",
        title: "Design partners confirmed",
        body: "Three DAOs have committed to pilot the tool once the treasury module ships.",
      },
    ],
    recentBackers: [
      { address: "0x5aC1...44Bf", amount: "1.0", time: "1 day ago" },
      { address: "0x9Bd2...12eA", amount: "0.5", time: "2 days ago" },
      { address: "0xE07f...8c19", amount: "3.0", time: "4 days ago" },
    ],
    minContribution: "0.02",
    daysLeft: 30,
  },
  {
    id: 4,
    title: "Cross-Chain Bridge",
    description: "Secure and fast cross-chain bridge enabling seamless asset transfers between Ethereum, Polygon, Arbitrum, and Optimism.",
    raised: "33.1",
    goal: "50",
    donors: 203,
    backers: 112,
    status: "active",
    imageColor: "#fbbf24",
    icon: "🌍",
    isOwner: false,
    category: "BRIDGE",
    tagline: "Lock-and-mint transfers between Ethereum, Polygon, Arbitrum, and Optimism, verified by light clients.",
    creator: {
      name: "Span Protocol",
      address: "0x5E6F7890aBCd1234EF567890AbcDeF123456789",
      verified: true,
    },
    story: [
      {
        heading: "Bridging shouldn't require trusting a multisig",
        body: "Most bridges rely on a small set of signers to approve transfers. Span verifies transfers with light clients instead, so no single party can move funds.",
      },
      {
        heading: "Supported routes",
        body: "At launch, Span connects Ethereum, Polygon, Arbitrum, and Optimism, with additional chains added as light-client support matures.",
      },
      {
        heading: "Security model",
        body: "Transfers are only finalized once the destination chain's light client confirms the source transaction, matching the security of the underlying chains.",
      },
      {
        heading: "Fund allocation",
        body: "Funds cover light-client circuit audits, relayer infrastructure, and a bug bounty ahead of mainnet launch.",
      },
    ],
    milestones: [
      { title: "Light-client circuits audited", target: "18 ETH", status: "complete" },
      { title: "Relayer network live", target: "35 ETH", status: "in-progress" },
      { title: "Mainnet launch, four chains", target: "50 ETH", status: "upcoming" },
    ],
    updates: [
      {
        date: "2026-08-30",
        title: "Arbitrum route passes testnet trial",
        body: "500 test transfers completed with zero failed finalizations.",
      },
      {
        date: "2026-08-12",
        title: "Circuit audit kicked off",
        body: "Our security partner began reviewing the light-client circuits this week.",
      },
    ],
    recentBackers: [
      { address: "0x6fA8...23Dc", amount: "4.0", time: "3 hours ago" },
      { address: "0xC91b...77Ef", amount: "1.0", time: "8 hours ago" },
      { address: "0x2Dd4...5a90", amount: "2.2", time: "1 day ago" },
    ],
    minContribution: "0.01",
    daysLeft: 14,
  },
  {
    id: 5,
    title: "Decentralized Identity",
    description: "Self-sovereign identity solution giving users full control over their digital identity and personal data across Web3.",
    raised: "22.4",
    goal: "50",
    donors: 156,
    backers: 78,
    status: "active",
    imageColor: "#22d3ee",
    icon: "🎨",
    isOwner: false,
    category: "IDENTITY",
    tagline: "Self-sovereign credentials that let users prove facts about themselves without exposing raw data.",
    creator: {
      name: "Sela Identity",
      address: "0x6F7890AbCD1234ef567890ABCdEf12345678901",
      verified: true,
    },
    story: [
      {
        heading: "Identity shouldn't live in someone else's database",
        body: "Sela issues verifiable credentials directly to a user's wallet, so proving your age or credentials never means handing over a copy of your ID.",
      },
      {
        heading: "Selective disclosure",
        body: "Zero-knowledge proofs let a user confirm a single fact, like being over 18, without revealing their birth date or any other credential contents.",
      },
      {
        heading: "Issuer network",
        body: "Universities, employers, and exchanges can issue credentials directly into the protocol, each cryptographically signed and independently revocable.",
      },
      {
        heading: "Fund allocation",
        body: "Funding supports the ZK circuit audit, issuer onboarding tooling, and a reference wallet integration.",
      },
    ],
    milestones: [
      { title: "ZK credential circuits", target: "12 ETH", status: "complete" },
      { title: "Issuer SDK", target: "22 ETH", status: "in-progress" },
      { title: "Reference wallet integration", target: "35 ETH", status: "upcoming" },
    ],
    updates: [
      {
        date: "2026-08-26",
        title: "First issuer live on testnet",
        body: "A partner university is now issuing verifiable diplomas through the protocol.",
      },
    ],
    recentBackers: [
      { address: "0x8bE3...61Ac", amount: "1.5", time: "5 hours ago" },
      { address: "0x3Cf9...90Bd", amount: "0.6", time: "1 day ago" },
      { address: "0xF12a...34Ce", amount: "2.0", time: "2 days ago" },
    ],
    minContribution: "0.01",
    daysLeft: 20,
  },
  {
    id: 6,
    title: "GameFi Platform",
    description: "Play-to-earn gaming platform with sustainable tokenomics, enabling players to earn real value from their gaming achievements.",
    raised: "41.8",
    goal: "50",
    donors: 278,
    backers: 145,
    status: "active",
    imageColor: "#34d399",
    icon: "🎵",
    isOwner: false,
    category: "GAMEFI",
    tagline: "Play-to-earn economics designed to reward skill over token emissions.",
    creator: {
      name: "Aftertale Studios",
      address: "0x7890AbCd1234Ef567890abCDeF1234567890AB12",
      verified: true,
    },
    story: [
      {
        heading: "Most play-to-earn games collapse under emissions",
        body: "When rewards come purely from inflation, token value spirals down as new players join. Aftertale ties rewards to a shared prize pool funded by in-game marketplace fees.",
      },
      {
        heading: "Sustainable tokenomics",
        body: "A fixed supply token is earned through ranked competition rather than minted per match, so player rewards don't dilute the wider economy.",
      },
      {
        heading: "Asset ownership",
        body: "In-game items are NFTs that carry between seasons and can be traded on any compatible marketplace, not just ours.",
      },
      {
        heading: "Fund allocation",
        body: "Raised funds cover game server infrastructure, matchmaking development, and the initial prize pool seed.",
      },
    ],
    milestones: [
      { title: "Ranked matchmaking beta", target: "15 ETH", status: "complete" },
      { title: "Marketplace fee pool live", target: "30 ETH", status: "in-progress" },
      { title: "Season one launch", target: "50 ETH", status: "upcoming" },
    ],
    updates: [
      {
        date: "2026-08-29",
        title: "10,000 beta matches played",
        body: "Our closed beta crossed 10,000 ranked matches with no reported economy exploits.",
      },
      {
        date: "2026-08-16",
        title: "Marketplace contracts deployed to testnet",
        body: "Players can now trade season-one items on our Sepolia testnet marketplace.",
      },
    ],
    recentBackers: [
      { address: "0xAA21...5f3B", amount: "2.5", time: "2 hours ago" },
      { address: "0x55Dc...81Fa", amount: "1.0", time: "7 hours ago" },
      { address: "0xE873...29Bd", amount: "3.5", time: "1 day ago" },
    ],
    minContribution: "0.01",
    daysLeft: 11,
  },
  {
    id: 7,
    title: "Oracle Network",
    description: "Decentralized oracle network providing reliable off-chain data to smart contracts with cryptographic proofs and multi-source verification.",
    raised: "38.9",
    goal: "50",
    donors: 167,
    backers: 92,
    status: "active",
    imageColor: "#a855f7",
    icon: "🎮",
    isOwner: false,
    category: "ORACLE",
    tagline: "Off-chain data delivered on-chain with cryptographic proofs from independently operated nodes.",
    creator: {
      name: "Lantern Data",
      address: "0x890AbCD1234EF567890aBCDef123456789012Cd",
      verified: true,
    },
    story: [
      {
        heading: "Smart contracts need honest data",
        body: "A contract is only as reliable as the data it acts on. Lantern aggregates prices and events from independently operated nodes and publishes the result with a cryptographic proof of consensus.",
      },
      {
        heading: "Node network",
        body: "Data providers stake collateral that is slashed if they report values that deviate from the network median, aligning incentives toward accuracy.",
      },
      {
        heading: "Multi-source verification",
        body: "Each data point draws from a minimum of five independent sources before it's accepted, reducing the impact of any single compromised feed.",
      },
      {
        heading: "Fund allocation",
        body: "Funds cover node operator incentives during bootstrap, a formal verification pass on the aggregation contract, and integration support for early adopters.",
      },
    ],
    milestones: [
      { title: "Aggregation contract audit", target: "15 ETH", status: "complete" },
      { title: "20 independent node operators live", target: "28 ETH", status: "in-progress" },
      { title: "Mainnet price feeds launch", target: "38 ETH", status: "upcoming" },
    ],
    updates: [
      {
        date: "2026-08-27",
        title: "12 node operators onboarded",
        body: "We're more than halfway to our target node count ahead of mainnet launch.",
      },
    ],
    recentBackers: [
      { address: "0xBb34...7Ce2", amount: "2.0", time: "6 hours ago" },
      { address: "0x1eF5...48Ad", amount: "1.1", time: "12 hours ago" },
      { address: "0x77Ca...96Fb", amount: "0.9", time: "1 day ago" },
    ],
    minContribution: "0.01",
    daysLeft: 16,
  },
  {
    id: 8,
    title: "Privacy Protocol",
    description: "Zero-knowledge proof based privacy layer enabling confidential transactions while maintaining regulatory compliance.",
    raised: "50.0",
    goal: "50",
    donors: 421,
    backers: 234,
    status: "past",
    imageColor: "#f472b6",
    icon: "💎",
    isOwner: false,
    category: "PRIVACY",
    tagline: "Confidential transfers that still satisfy compliance reporting when required.",
    creator: {
      name: "Umbra Systems",
      address: "0x90ABcD1234ef567890AbCDEF1234567890123De",
      verified: true,
    },
    story: [
      {
        heading: "Privacy and compliance aren't opposites",
        body: "Umbra uses zero-knowledge proofs to hide transaction amounts and counterparties by default, while still letting users generate a selective compliance report on demand.",
      },
      {
        heading: "Shielded transfers",
        body: "Transfers settle through a shielded pool; balances and amounts are only visible to the sender and receiver unless voluntarily disclosed.",
      },
      {
        heading: "Compliance viewing keys",
        body: "Users can issue a time-limited viewing key to an auditor or exchange without exposing their full transaction history.",
      },
      {
        heading: "Fund allocation",
        body: "This campaign funded the shielded pool audit, circuit optimization for lower gas costs, and the reference wallet SDK.",
      },
    ],
    milestones: [
      { title: "Shielded pool audit", target: "20 ETH", status: "complete" },
      { title: "Gas optimization pass", target: "35 ETH", status: "complete" },
      { title: "Mainnet launch", target: "50 ETH", status: "complete" },
    ],
    updates: [
      {
        date: "2026-06-18",
        title: "Mainnet is live",
        body: "Umbra shielded transfers are now live on mainnet. Thank you to everyone who backed this campaign.",
      },
      {
        date: "2026-05-30",
        title: "Funding goal reached",
        body: "We hit our 50 ETH goal three days ahead of schedule.",
      },
    ],
    recentBackers: [
      { address: "0xAc41...3F9d", amount: "5.0", time: "3 months ago" },
      { address: "0x2E7b...81Ca", amount: "2.0", time: "3 months ago" },
      { address: "0xD90f...44Be", amount: "1.0", time: "3 months ago" },
    ],
    minContribution: "0.01",
    daysLeft: 0,
  },
  {
    id: 9,
    title: "Staking Platform",
    description: "Non-custodial staking platform supporting multiple proof-of-stake networks with competitive yields and instant liquidity.",
    raised: "50.0",
    goal: "50",
    donors: 389,
    backers: 198,
    status: "past",
    imageColor: "#fbbf24",
    icon: "🚀",
    isOwner: false,
    category: "STAKING",
    tagline: "Non-custodial staking across multiple proof-of-stake networks from a single dashboard.",
    creator: {
      name: "Anchor Point",
      address: "0xABcD1234Ef567890abCDEf1234567890123456F0",
      verified: true,
    },
    story: [
      {
        heading: "Staking shouldn't mean giving up custody",
        body: "Anchor Point routes stake directly to validator smart contracts on each supported chain, so users retain full custody and can unstake without asking permission.",
      },
      {
        heading: "Multi-network support",
        body: "The dashboard supports staking across five proof-of-stake networks with a single interface and unified reward tracking.",
      },
      {
        heading: "Instant liquidity",
        body: "Liquid staking tokens represent staked positions and can be traded or used as collateral while the underlying stake continues earning rewards.",
      },
      {
        heading: "Fund allocation",
        body: "Funds covered validator infrastructure for the first five networks, a smart contract audit, and the liquid staking token launch.",
      },
    ],
    milestones: [
      { title: "Validator infrastructure, five networks", target: "20 ETH", status: "complete" },
      { title: "Liquid staking token audit", target: "38 ETH", status: "complete" },
      { title: "Public dashboard launch", target: "50 ETH", status: "complete" },
    ],
    updates: [
      {
        date: "2026-05-02",
        title: "Platform fully live",
        body: "All five networks are now supported with instant liquid staking.",
      },
    ],
    recentBackers: [
      { address: "0x11Fa...67Bd", amount: "3.0", time: "4 months ago" },
      { address: "0x99Ac...23Ef", amount: "1.5", time: "4 months ago" },
      { address: "0x4Db7...81Ca", amount: "4.0", time: "4 months ago" },
    ],
    minContribution: "0.01",
    daysLeft: 0,
  },
  {
    id: 10,
    title: "Social DApp",
    description: "Decentralized social media platform where users own their content and data, with built-in monetization for creators.",
    raised: "50.0",
    goal: "50",
    donors: 512,
    backers: 287,
    status: "past",
    imageColor: "#22d3ee",
    icon: "⚡",
    isOwner: false,
    category: "SOCIAL",
    tagline: "A social feed where every post, follow, and tip lives on-chain and belongs to its creator.",
    creator: {
      name: "Commons Feed",
      address: "0xBCd1234ef567890AbCDeF123456789012345670",
      verified: true,
    },
    story: [
      {
        heading: "Your feed, your data",
        body: "Commons Feed stores posts and social graphs on-chain, so creators can move to a new client without losing their audience or history.",
      },
      {
        heading: "Built-in monetization",
        body: "Followers can tip creators directly in ETH, with no platform cut and no waiting period for payout.",
      },
      {
        heading: "Moderation without a central switch",
        body: "Communities set their own moderation rules through opt-in filter lists rather than a single company deciding what's visible.",
      },
      {
        heading: "Fund allocation",
        body: "Funds went toward indexing infrastructure, the mobile client, and a creator monetization audit.",
      },
    ],
    milestones: [
      { title: "On-chain social graph", target: "18 ETH", status: "complete" },
      { title: "Tipping & monetization audit", target: "35 ETH", status: "complete" },
      { title: "Mobile client launch", target: "50 ETH", status: "complete" },
    ],
    updates: [
      {
        date: "2026-04-20",
        title: "Mobile app launched",
        body: "The iOS and Android clients are now live, both reading from the same on-chain feed.",
      },
    ],
    recentBackers: [
      { address: "0x5Ae2...90Fc", amount: "2.0", time: "5 months ago" },
      { address: "0xE31c...48Bd", amount: "6.0", time: "5 months ago" },
      { address: "0x02Fd...73Ae", amount: "1.0", time: "5 months ago" },
    ],
    minContribution: "0.01",
    daysLeft: 0,
  },
  {
    id: 11,
    title: "Insurance Protocol",
    description: "Peer-to-peer insurance protocol for DeFi, protecting users against smart contract vulnerabilities and hacks.",
    raised: "50.0",
    goal: "50",
    donors: 345,
    backers: 176,
    status: "past",
    imageColor: "#34d399",
    icon: "🛡️",
    isOwner: false,
    category: "INSURANCE",
    tagline: "Peer-funded cover pools that pay out automatically when an on-chain exploit is confirmed.",
    creator: {
      name: "Bastion Mutual",
      address: "0xCd1234Ef567890abCDEF123456789012345678F1",
      verified: true,
    },
    story: [
      {
        heading: "Smart contract risk needed real cover",
        body: "Bastion lets users pool capital into cover funds for specific protocols, paying claims automatically once an oracle confirms a qualifying exploit.",
      },
      {
        heading: "Claims without a claims department",
        body: "Payouts trigger from an on-chain oracle report rather than a manual review process, so covered users are paid within hours, not months.",
      },
      {
        heading: "Underwriter incentives",
        body: "Capital providers earn premiums for backing a cover pool and can withdraw once their capital is no longer at risk from open claims.",
      },
      {
        heading: "Fund allocation",
        body: "This round funded the claims oracle audit, the first three cover pools, and a bug bounty program.",
      },
    ],
    milestones: [
      { title: "Claims oracle audit", target: "20 ETH", status: "complete" },
      { title: "First three cover pools seeded", target: "38 ETH", status: "complete" },
      { title: "Public launch", target: "50 ETH", status: "complete" },
    ],
    updates: [
      {
        date: "2026-03-15",
        title: "First claim paid automatically",
        body: "A covered protocol suffered an exploit and the pool paid out within six hours of the oracle report.",
      },
    ],
    recentBackers: [
      { address: "0x3fB1...52Da", amount: "4.0", time: "6 months ago" },
      { address: "0x8Ad3...19Ef", amount: "2.5", time: "6 months ago" },
      { address: "0xF60c...84Bb", amount: "1.0", time: "6 months ago" },
    ],
    minContribution: "0.01",
    daysLeft: 0,
  },
];

// Helper function to get project by ID
export const getProjectById = (id) => {
  return projects.find(p => p.id === parseInt(id)) || null;
};
