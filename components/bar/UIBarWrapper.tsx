const UIBarWrapper = ({ children } : {
    children: React.ReactNode
}) => {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-2 p-6 sm:flex-row">
            {children}
        </div>
    )
}

export default UIBarWrapper