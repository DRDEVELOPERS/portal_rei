// components/test/TwilioTest.js
"use client";
import { useState } from "react";

export default function TwilioTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const sendTestMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sendWhatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "+5548999500957",
          contentSid: "HXb5b62575e6e4ff6129ad7c8efe1f983e",
          variables: {
            1: "Cliente VIP",
            2: "PF-2024-00001",
            5: "R$ 1.499,90",
            6: "24 horas",
          },
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Falha ao enviar mensagem" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <button
        onClick={sendTestMessage}
        disabled={loading}
        className="bg-primary-yellow text-primary-black px-4 py-2 rounded hover:bg-[#f8d634] transition-colors"
      >
        {loading ? "Enviando..." : "Enviar Mensagem Teste"}
      </button>
      {result && (
        <div className="text-black mt-4 p-2 bg-gray-100 rounded">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
