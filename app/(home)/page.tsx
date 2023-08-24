import Head from 'next/head'
import Chart from "../../components/chart/UIChart"
import { IPortfolio } from "../../types/Portfolio";

import Logo from "../../components/Logo";
import UIHeroInvestments from "../../components/heroes/UIHeroInvestments";
import UIHeroMine from "../../components/heroes/UIHeroMine";
import UICurrentBalance from "../../components/UICurrentBalance";
import UIBar from "../../components/bar/UIBar";
import UIBarWrapper from "../../components/bar/UIBarWrapper";
import UIPortfolioWrapper from '../../components/portfolio/UIPortfolioWrapper';
import UIPortfolioContent from '../../components/portfolio/UIPortfolioContent';
import UIPortfolioTitle from '../../components/portfolio/UIPortfolioTitle';
import { query, gql } from '../../util/api';

const getPortfolio = gql`
    query getPortfolio {
        portfolio {
            id
            currentBalance {
            goldBalance
            platinumBalance
        }
        history {
            date
            totalValue {
                currency
                amount
            }
        }
        portfolioItems {
            image
            sku
            name
            purchasePrice
            weight
            metal
        }
    }
  }
`;

const streamQuery = gql`
  query {
    streamUrl
  }
`;


type PortfolioData = {
    portfolio: IPortfolio
}
export default async function Home() {
    const { portfolio } = await query(getPortfolio) as PortfolioData;
    const streamUrl = await query(streamQuery) as string

    return (
        <div>
          <Head>
            <title>7879 - Marcelo Interview</title>
            <meta name="description" content="Test" />
            <meta name="robots" content="noindex,nofollow" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
            <header className="flex flex-col items-center justify-between w-full sm:flex-row">
                <div className="flex gap-2 py-5 sm:pl-12">
                    <Logo />
                </div>
                {portfolio && (
                    <div className="flex items-center justify-center gap-4 px-4 py-5">
                        <UICurrentBalance metalName="Gold" price={portfolio.currentBalance.goldBalance} />
                        <UICurrentBalance metalName="Platinum" price={portfolio.currentBalance.platinumBalance} />
                    </div>
                )}
            </header>

            <main>
                <UIHeroInvestments />
                {/** 
                 * CLS improvements with skeleton.We don't need anymore since we have the data already in the client
                */}
                {/* {isLoading && <ChartSkeleton />} */}
                {portfolio && streamUrl && (
                    <Chart
                        portfolio={portfolio}
                        streamUrl={streamUrl}
                    />
                )}

                {/** 
                 * Not clear the calcule to get the value of the bar
                */}
                <UIBarWrapper>
                    <UIBar variant="saphire" label="Saphire value" value="£ 124" />
                    <UIBar variant="gold" label="Saphire value" value="£ 124" />
                    <UIBar variant="platinum" label="Saphire value" value="£ 124" />
                </UIBarWrapper>
                <UIPortfolioWrapper>
                    <UIPortfolioTitle />
                    {portfolio?.portfolioItems.map((item) => {
                        return (
                            <UIPortfolioContent 
                                key={item.sku}
                                name={item.name}
                                metal={item.metal}
                                weight={item.weight}
                                purchasePrice={item.purchasePrice}
                            />
                        )
                    })}
                </UIPortfolioWrapper>  
                <UIHeroMine />
            </main>
        </div>
    );
};