export const metadata = {
  title: 'Products',
}

const ProductLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="p-10">{children}</div>
  )
}

export default ProductLayout