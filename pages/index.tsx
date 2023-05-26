import Head from 'next/head';
import { Menu } from '@/componentes/Menu';

const Home: React.FC = () => {
    return (
        <div className="container">
            <Head>
                <title>Loja Next</title>
            </Head>

            <Menu />

            <main style={styles.main}>
                <h1 style={styles.title}>Página Inicial</h1>
            </main>
        </div>
    );
};

const styles = {
    main: {
        marginTop: '2rem',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
    },
};

export default Home;
