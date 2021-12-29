import Link from 'next/link';
import useTezos from '../../hooks/use-tezos';
import styles from './styles.module.css';

const Header = () => {
    const {sync, unsync, auth} = useTezos();

    return (
        <header className={styles.header}>
            <div>
                <h1>
                    <Link href='/' passHref>
                        <a>
                            Order &amp; Chaos
                        </a>
                    </Link>
                </h1>
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
