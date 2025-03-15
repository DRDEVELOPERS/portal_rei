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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "+5511937789330", // Your test number
          contentSid: "HXb5b62575e6e4ff6129ad7c8efe1f983e",
          contentVariables: JSON.stringify({
            1: "Reinaldo",
            2: "Parafusadeira 18V",
            3: "PF-2023-04567",
            4: "https://portalferragem.shop/images/logo.png",
            5: "R$ 489,90",
            6: "2-3 dias úteis",
          }),
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Failed to send message" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <button
        onClick={sendTestMessage}
        disabled={loading}
        className="bg-primary-yellow text-primary-black px-4 py-2 rounded"
      >
        {loading ? "Enviando..." : "Enviar Mensagem de Teste"}
      </button>

      {result && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
