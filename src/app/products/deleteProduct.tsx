"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

const DeleteProduct = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const hendleDelete = async (productId: number) => {
    setIsLoading(true);
    await axios.delete(`/api/products/${productId}`);
    router.refresh();
    setIsOpen(false);
    setIsLoading(false);
  };

  const hendleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button className='btn btn-error btn-sm' onClick={hendleModal}>
        Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Are sure to delete {product.title}?</h3>
          <div className='modal-action'>
            <button type='button' className='btn' onClick={hendleModal}>
              No
            </button>
            <button type='button' onClick={() => hendleDelete(product.id)} className='btn btn-primary'>
              {isLoading ? (<span className="loading loading-dots loading-xs"></span>) : "Yes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
