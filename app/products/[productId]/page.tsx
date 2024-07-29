import NotFound from "@/components/NotFound";
import { Product } from "@/entities/product";

async function fetchProduct(id: string) {
  try {
    const response = await fetch('https://www.jsonkeeper.com/b/3ZUJ',
      { next: { revalidate: 40 } }
    );
    const data = await response.json() as Product[];
    const foundProduct = data.find(product => product.Id === id);
    return foundProduct;
  } catch (error) {
    console.log(error)
  }
}

const page = async ({params}: {params: {productId: string}}) => {

  const product = await fetchProduct(params.productId);
  if (!product) {
    return <NotFound />;
  }

  return (
    <section className="relative m-8">
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
            <div className="img">
                <div className="img-box h-full max-lg:mx-auto ">
                    <img src={product?.FeaturedImageUrl} alt="Yellow Tropical Printed Shirt image"
                        className="max-lg:mx-auto lg:ml-auto h-full" />
                </div>
            </div>
            <div
                className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                <div className="data w-full max-w-xl">
                    
                    <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">{product?.Name}</h2>
                    <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                        <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">Quantity: {product?.Quantity} </h6>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                        <h6 className="font-manrope font-semibold text-3xl leading-9 text-pink-600 pr-5 sm:border-r border-gray-200 mr-5">Tk. {product?.ProductPrice.Price} </h6>
                    </div>
                    <p className="text-gray-500 text-base font-normal mb-5">
                        {product?.ShortDescription}
                    </p>
                    
                    <div className="flex items-center gap-3">
                        <button
                            className="text-center w-full px-5 py-4 rounded-[100px] bg-pink-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-pink-700 hover:shadow-indigo-400">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
                                        
  )
}

export default page