"use client";

import { useState } from "react";
import EnquiryModal from "./EnquiryModal";

interface Props {
  productId: string;
  productName: string;
}

export default function EnquireButton({ productId, productName }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex-1 text-center text-xs tracking-widest uppercase px-6 py-4 transition-all hover:opacity-90"
        style={{
          backgroundColor: "var(--color-text-900)",
          color: "var(--color-ivory-50)",
        }}
      >
        Enquire Now
      </button>
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={productId}
        productName={productName}
      />
    </>
  );
}
