export const formatPrice = (cents) => {
  return (cents / 100).toLocaleString("en", {
    style: "currency",
    currency: "CAD",
  });
};
