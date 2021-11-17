import useTezos from '../../hooks/use-tezos';
import styles from './styles.module.css';

const Header = () => {
    const {sync, unsync, auth} = useTezos();

    return (
        <header className={styles.header}>
            <div>
                <h1>
                    <a href="https://objkt.com/profile/tz1VgpmwW66LCbskjudK54Zp96vKn2cHjpGN">
                        Order &amp; Chaos
                    </a>
                </h1>
                <p>Hic et Nunc Wallets:
                    <br/>
                    <a href="https://objkt.com/profile/tz1VgpmwW66LCbskjudK54Zp96vKn2cHjpGN">tz1Vg...HjpGN</a>
                    <br/>
                    <a href="https://objkt.com/profile/tz1KySTBB8RXWVraggfXWLaLR9H3K3JBEbgt">tz1Ky...BEbgt</a>
                    <br/>
                    <a href="https://objkt.com/profile/tz1dAcFB4ApJmwvWxWfZBMgU9omabrjx4gWn">tz1dA...x4gWn</a>
                    <br/>
                    <a href="https://objkt.com/profile/tz1iM7PB4brTmkbTUccsrXYjepSQ6ext7KYu">tz1iM...t7KYu</a>
                </p>
            </div>
            <div className={styles.auth}>
                <p>
                    {auth ? ' ' + auth.address : ' Sync wallet to begin'}
                    {' '}
                    {!auth
                    ? <button onClick={sync}>Sync</button>
                    : <button onClick={unsync}>Unsync</button>}
                </p>
            </div>
        </header>
    );
};

export default Header;
