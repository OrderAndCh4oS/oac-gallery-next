import Link from 'next/link';
import styles from './styles.module.css';

const Header = () => {

    return (
        <header className={styles.header}>
            <div>
                <h1>
                    <Link href="/" passHref>
                        <a>Order &amp; Chaos</a>
                    </Link>
                </h1>
            </div>
            <div className={styles.auth}>
                <p>
                    <Link href={`/`}>
                        <a>Hic et Nunc</a>
                    </Link>
                    <span className="c-yellow"> | </span>
                    <Link href={'/fxhash'}>
                        FxHash
                    </Link>
                    <span className="c-yellow"> | </span>
                    <Link href={'/objkt'}>
                        Objkt
                    </Link>
                    <span className="c-yellow"> | </span>
                    <Link href={'/rarible'}>
                        Rarible
                    </Link>
                </p>
            </div>
        </header>
    );
};

export default Header;
