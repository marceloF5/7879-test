
type UICurrentBalanceProps = {
    metalName: string
    price: number
} 

const UICurrentBalance = ({metalName, price}: UICurrentBalanceProps) => {
    const bgColor = metalName.toLocaleLowerCase() === 'gold' ? 'bg-gold' : 'bg-platinum'

    return (
        <div className={`${bgColor} flex justify-center items-center max-w-min`}>
            <div className="p-1 m-1">{metalName}</div>
            <div className="px-2 py-1 m-1 bg-white">{price}</div>
        </div>
        
    )
}

export default UICurrentBalance