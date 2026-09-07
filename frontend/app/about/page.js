import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.intro}>
          <span className={styles.kicker}>About</span>
          <h1 className={styles.heading}>Why FundArc exists</h1>
        </div>

        <div className={styles.body}>
          <p>
            Most good ideas don&apos;t come from people with connections. They
            come from people willing to build. Right now, getting one funded
            usually means finding an investor, pitching a room you can&apos;t
            get into, or waiting for a seat in an accelerator like Y
            Combinator. That process selects for who you know. It has nothing
            to do with the work itself.
          </p>

          <p>
            I built FundArc so smaller projects can raise money without going
            through that filter. A campaign here is a smart contract, not a
            pitch deck. Anyone can see how much has been raised, who raised
            it, and where the money goes, because all of it is on-chain. You
            don&apos;t have to take a founder&apos;s word for anything.
          </p>

          <p>
            The goal isn&apos;t to replace investors. It&apos;s to give
            builders another way in. A community that already believes in a
            project should be able to fund it through to launch, directly,
            without a middleman deciding first whether the idea is good
            enough.
          </p>

          <p>
            None of that works if the money can&apos;t be checked. Every
            contribution FundArc processes lives on a contract anyone can
            read. Trust between a builder and the people backing them
            shouldn&apos;t depend on reputation or who introduced who. It
            should depend on something you can verify yourself.
          </p>

          <p>
            This is early. The contracts are simple and the platform is
            unfinished. But the premise holds: you shouldn&apos;t need a
            small number of gatekeepers to say yes before you can start. You
            need people who want the thing enough to fund it.
          </p>
        </div>
      </div>
    </main>
  );
}
