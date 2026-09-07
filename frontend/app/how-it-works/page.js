import Link from 'next/link';
import styles from './page.module.css';

export default function HowItWorksPage() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.intro}>
          <span className={styles.kicker}>Guide</span>
          <h1 className={styles.heading}>How FundArc works</h1>
          <p className={styles.subhead}>
            A plain account of what happens when you back a project or start one,
            from browsing to the transaction itself to how funds move afterward.
          </p>
        </div>

        <section className={styles.section}>
          <span className={styles.sectionKicker}>01 / Find a project</span>
          <h2 className={styles.sectionTitle}>Browse and choose a campaign</h2>
          <div className={styles.sectionBody}>
            <p>
              The Discover page lists every campaign, split into Active, Upcoming,
              and Past. Each card shows a category, a short tagline, how much has
              been raised against its goal, and how many backers have contributed.
            </p>
            <p>
              Opening a campaign shows its full story in sections, its milestones,
              any updates from the creator, a list of recent backers, and a
              transparency panel linking to the contract it uses on Etherscan.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionKicker}>02 / Connect a wallet</span>
          <h2 className={styles.sectionTitle}>Connect a wallet</h2>
          <div className={styles.sectionBody}>
            <p>
              Contributing requires a connected wallet. There&apos;s no account or
              email; the site talks to your wallet directly. If a campaign
              isn&apos;t open for funding, because it hasn&apos;t started yet or
              has already ended, you&apos;ll see that instead of a funding form.
            </p>
            <p>
              The site also shows which network you&apos;re connected to, since
              the funding contract only exists on specific networks.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionKicker}>03 / Contribute</span>
          <h2 className={styles.sectionTitle}>Contribute and confirm</h2>
          <div className={styles.sectionBody}>
            <p>
              When a campaign is open, you type in an ETH amount and see a live
              USD estimate next to it. Clicking Fund now doesn&apos;t send
              anything yet. It opens a confirmation screen showing the amount,
              its USD value, an estimated gas cost, and the total.
            </p>
            <p>
              Only after you confirm does your wallet ask you to sign a
              transaction that calls the contract&apos;s <code className={styles.code}>fund</code> function
              with your ETH attached. Once the network confirms it, you&apos;ll
              see the transaction hash and a link to view it on Etherscan.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionKicker}>04 / On-chain record</span>
          <h2 className={styles.sectionTitle}>What gets recorded on-chain</h2>
          <div className={styles.sectionBody}>
            <p>
              The contract records how much each address has funded and keeps a
              running list of funders. It also enforces its own minimum: any
              single contribution has to be worth at least $5, checked live
              against a Chainlink price feed, regardless of the minimum
              contribution listed on a campaign&apos;s page.
            </p>
          </div>
          <div className={styles.note}>
            <span className={styles.noteLabel}>Current limitation</span>
            <p className={styles.noteBody}>
              Every campaign on the site currently sends contributions to the
              same funding contract. That contract doesn&apos;t yet know which
              campaign a contribution was meant for, so the funding totals and
              progress bars you see per campaign are not a live read from the
              chain today. Giving each campaign its own on-chain ledger is the
              next thing to build.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionKicker}>05 / Withdrawals</span>
          <h2 className={styles.sectionTitle}>How creators withdraw</h2>
          <div className={styles.sectionBody}>
            <p>
              Only the wallet that deployed the contract can withdraw funds, and
              withdrawing pulls out the entire contract balance at once. Doing so
              also resets every contributor&apos;s recorded amount back to zero.
            </p>
          </div>
          <div className={styles.note}>
            <span className={styles.noteLabel}>Current limitation</span>
            <p className={styles.noteBody}>
              There&apos;s no per-creator or per-campaign withdrawal yet. An
              individual project creator can&apos;t currently pull out just
              their own campaign&apos;s funds; only the contract owner can
              withdraw, and it&apos;s all or nothing. Review a campaign&apos;s
              contract on Etherscan before funding it, the same way you&apos;d
              check anything else before sending money.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionKicker}>06 / Starting a fundraiser</span>
          <h2 className={styles.sectionTitle}>Starting a fundraiser</h2>
          <div className={styles.sectionBody}>
            <p>
              Starting a fundraiser walks you through five steps: basics (title,
              category, tagline, cover image), your story in sections, funding
              terms (goal, duration, minimum contribution, optional milestones),
              payout details pulled from your connected wallet plus a payout
              schedule choice, and a final review.
            </p>
          </div>
          <div className={styles.note}>
            <span className={styles.noteLabel}>Current limitation</span>
            <p className={styles.noteBody}>
              The last step, Deploy campaign, is a placeholder today. There&apos;s
              no campaign-creation contract yet, so clicking it doesn&apos;t send
              a transaction or create anything on-chain. It shows you what
              deployment will look like once that contract exists.
            </p>
          </div>
        </section>

        <p className={styles.closing}>
          FundArc is under active development. As the contracts change, this
          page will be updated to match. <Link href="/">Back to Discover</Link>.
        </p>
      </div>
    </main>
  );
}
