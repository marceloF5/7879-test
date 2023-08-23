function UIPortfolioWrapper({children}: {children: React.ReactNode}) {
  return (
      <div className="flex flex-col items-center justify-center w-full p-6 bg-platinum-1">
          <div className="w-full max-w-xs gap-6 p-10 bg-white divide-y sm:max-w-6xl">
            {children}
        </div>
    </div>
  )
}

export default UIPortfolioWrapper