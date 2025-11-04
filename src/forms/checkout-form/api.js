import axios from "axios";

export const postData = async (data) => {
  try {
    const res = await axios.post("https://echo.free.beeceptor.com", data, {
      headers: { "Content-Type": "application/json" },
      timeout: 10_000,
    });

    if (res.status === 200) {
      console.log("Successfull submission:", data);
      alert("Order submitted successfully!");
    }
  } catch (error) {
    console.error("Error in submission:", error);
    alert("Submission failed!");
  }
};
