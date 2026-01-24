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
    status: "active",
    imageColor: "#22d3ee",
    icon: "💎",
    isOwner: true
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
    isOwner: false
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
    isOwner: false
  },
  {
    id: 3,
    title: "DAO Governance Tool",
    description: "Comprehensive governance toolkit enabling DAOs to manage proposals, voting, and treasury operations with full transparency.",
    raised: "18.7",
    goal: "50",
    donors: 87,
    backers: 64,
    status: "active",
    imageColor: "#f472b6",
    icon: "🛡️",
    isOwner: false
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
    isOwner: false
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
    isOwner: false
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
    isOwner: false
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
    isOwner: false
  },
  {
    id: 8,
    title: "Privacy Protocol",
    description: "Zero-knowledge proof based privacy layer enabling confidential transactions while maintaining regulatory compliance.",
    raised: "50.0",
    goal: "50",
    donors: 421,
    backers: 234,
    status: "completed",
    imageColor: "#f472b6",
    icon: "💎",
    isOwner: false
  },
  {
    id: 9,
    title: "Staking Platform",
    description: "Non-custodial staking platform supporting multiple proof-of-stake networks with competitive yields and instant liquidity.",
    raised: "50.0",
    goal: "50",
    donors: 389,
    backers: 198,
    status: "completed",
    imageColor: "#fbbf24",
    icon: "🚀",
    isOwner: false
  },
  {
    id: 10,
    title: "Social DApp",
    description: "Decentralized social media platform where users own their content and data, with built-in monetization for creators.",
    raised: "50.0",
    goal: "50",
    donors: 512,
    backers: 287,
    status: "completed",
    imageColor: "#22d3ee",
    icon: "⚡",
    isOwner: false
  },
  {
    id: 11,
    title: "Insurance Protocol",
    description: "Peer-to-peer insurance protocol for DeFi, protecting users against smart contract vulnerabilities and hacks.",
    raised: "50.0",
    goal: "50",
    donors: 345,
    backers: 176,
    status: "completed",
    imageColor: "#34d399",
    icon: "🛡️",
    isOwner: false
  }
];

// Helper function to get project by ID
export const getProjectById = (id) => {
  return projects.find(p => p.id === parseInt(id)) || null;
};
