"use client";
import { useState, SyntheticEvent } from "react";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

const UpdateProduct = ({ brands, product }: { brands: Brand[]; product: Product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [brand, setBrand] = useState(product.brandId);

  const router = useRouter();

  const hendleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/products/${product.id}`, {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    });
    router.refresh();
    setIsOpen(false);
    setIsLoading(false);
  };

  const hendleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button className='btn btn-info btn-sm' onClick={hendleModal}>
        Edit
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Update {product.title}</h3>
          <form onSubmit={hendleUpdate}>
            <div className='form-control w-full'>
              <label className='label font-bold'>Product Name</label>
              <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='input input-bordered' placeholder='Product Name' />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>Price</label>
              <input type='text' value={price} onChange={(e) => setPrice(Number(e.target.value))} className='input input-bordered' placeholder='Price' />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>Brand</label>
              <select value={brand} onChange={(e) => setBrand(Number(e.target.value))} className='select select-bordered'>
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='modal-action'>
              <button type='button' className='btn' onClick={hendleModal}>
                Close
              </button>
              <button type='submit' className='btn btn-primary'>
                {isLoading ? (<span className="loading loading-dots loading-xs"></span>) : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
