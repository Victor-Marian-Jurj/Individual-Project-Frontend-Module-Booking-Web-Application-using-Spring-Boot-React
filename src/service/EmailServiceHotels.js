import axiosInstance from "../plugins/axiosConfig";

export const sendPDFToBackend = async (email, pdfBlob) => {
  try {
    // Create FormData object to send the PDF file and email address to the backend
    const formData = new FormData();
    formData.append("file", pdfBlob, "filtered_hotels.pdf");
    formData.append("email", email);

    // Send the FormData object to the backend
    const response = await axiosInstance.post("/sendMail", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type as multipart/form-data
      },
    });

    return response.data; // Assuming the backend returns some data upon successful email sending
  } catch (error) {
    throw new Error("Error sending PDF to backend: " + error.message);
  }
};
