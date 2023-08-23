type UIValuesBarProps = {
    variant: 'saphire' | 'gold' | 'platinum'
    label: string
    value: string
}

const variants = {
    saphire: {
        mainBgColor:'bg-saphire-18',
        secondBgColor:'bg-saphire-9'
    },
    gold: {
        mainBgColor: 'bg-gold-18',
        secondBgColor: 'bg-gold-9'
    },
    platinum: {
        mainBgColor: 'bg-platinum-18',
        secondBgColor: 'bg-platinum-9'
    },
}

const UIValuesBar = ({label, value, variant }: UIValuesBarProps) => {
    return (
        <div className="flex items-center h-12 max-w-md">
            <div className={`${variants[variant].mainBgColor} px-2 py-1 mr-[2px] h-full flex justify-center items-center`}>{label}</div>
            <div className={`${variants[variant].secondBgColor} px-2 py-1 w-32 h-full flex justify-center items-center`}>{value}</div>
        </div>
    )
}

export default UIValuesBar