"use client";

export const TestRazorpay = () => {
  const handleTest = async () => {
    const response = await fetch("/api/razorpay/create-subscription", {
      method: "POST",
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <button onClick={handleTest} className="bg-blue-500 text-white px-4 py-2 rounded">
      Test Razorpay
    </button>
  );
};