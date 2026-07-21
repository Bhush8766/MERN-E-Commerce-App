const calculatePrice = ({
  items,
  shippingCharge = 0,
  taxRate = 18,
  discount = 0,
}) => {
  const subTotal = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const tax = (subTotal * taxRate) / 100;

  const total = subTotal + shippingCharge + tax - discount;

  return {
    subTotal,
    shippingCharge,
    tax,
    discount,
    total,
  };
};

module.exports = calculatePrice;