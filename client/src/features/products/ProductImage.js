import React from "react";

export default function ProductImage({ src }) {
  return (
    <div>
      <img src={src} width="100%" height="auto" alt="products details"/>
    </div>
  );
}
