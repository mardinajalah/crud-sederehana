"use client";
import { useState, SyntheticEvent } from "react";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProduct = ({ brands }: { brands: Brand[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");

  const router = useRouter();

  const hendleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.post("/api/products", {
      title: title,
      price: Number(price),
      brandId: Number(brand)
    });
    setTitle("");
    setPrice("");
    setBrand("");
    router.refresh();
    setIsOpen(false);
    setIsLoading(false);
  }

  const hendleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button className='btn' onClick={hendleModal}>
        Add New
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add New Product</h3>
          <form onSubmit={hendleSubmit}>
            <div className='form-control w-full'>
              <label className='label font-bold'>Product Name</label>
              <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='input input-bordered' placeholder='Product Name' />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>Price</label>
              <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} className='input input-bordered' placeholder='Price' />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>Brand</label>
              <select value={brand} onChange={(e) => setBrand(e.target.value)} className='select select-bordered'>
                <option value='' disabled>
                  Select A Brand
                </option>
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
                {isLoading ? (<span className="loading loading-dots loading-xs"></span>) : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
