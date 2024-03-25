export const parseItemName = (itemName: string, maxLength: number) => {
  if (itemName.length > maxLength) {
    return itemName.slice(0, maxLength) + "...";
  }
  return itemName;
};
