import Head from 'next/head'
export default function Layout({ children }: {
    children: React.ReactNode,
}) {
    return (
        <>
            <Head>
                <title>7879 - Home</title>
                <meta name="description" content="Test" />
                <meta name="robots" content="noindex,nofollow" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {children}
        </>
    )
}

