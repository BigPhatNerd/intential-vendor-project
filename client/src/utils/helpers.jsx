import axios from "axios";

export const priceCentsToDollars = (priceCents) => {
  return (priceCents / 100).toFixed(2);
};

export const downloadFile = async (productId) => {
  try {
    const response = await axios.get(
      `/api/products/download-json/${productId}`,
      {
        responseType: "blob", // Important: tells Axios to expect a Blob object as response
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "soda.json");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    return true;
  } catch (error) {
    return false;
  }
};
