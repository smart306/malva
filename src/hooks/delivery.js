import { useState } from "react";

export function useDelivery(initialList) {
  const [dostavkaList] = useState(initialList);
  const [selectedDostavka, setSelectedDostavka] = useState( initialList.length > 0 ? initialList[0] : null, );

  const handleDostavkaChange = (e) => {
    const found = dostavkaList.find((item) => item.name === e.target.value);
    if (found) setSelectedDostavka(found);
  };
  const deliveryPrice = selectedDostavka ? Number(selectedDostavka.price) : 0;
  return {
    dostavkaList,
    selectedDostavka,
    deliveryPrice,
    handleDostavkaChange,
  };
}