import UICurrentBalance from '../UICurrentBalance'

type UIPortfolioContentProps = {
    name: string
    metal: string
    weight: number
    purchasePrice: number
}

function UIPortfolioContent({ name, metal, weight, purchasePrice}: UIPortfolioContentProps) {
    return (
        <div className="flex flex-col items-start w-full gap-2 p-6 sm:grid sm:grid-cols-3">
            <div className='flex flex-col items-start justify-center w-full max-w-xs'>
                <p>{name}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className="flex flex-col w-36">
                    <p className='text-lg font-semibold'>{purchasePrice}</p>
                    <UICurrentBalance metalName={metal} price={weight} />
                </div>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <p className='font-semibold'>{purchasePrice}</p>
                <p>{purchasePrice}</p>
            </div>
        </div>
    )
}

export default UIPortfolioContent