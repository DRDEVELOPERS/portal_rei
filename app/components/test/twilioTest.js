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
          to: "+5511952944096",
          contentSid: "HX_YOUR_NEW_TEMPLATE_SID", // Get from Twilio
          contentVariables: JSON.stringify({
            1: "Cliente VIP", // Nome do cliente
            2: "PF-2024-04567", // Número do pedido
            3: "Parafusadeira Impacto 18V 150Nm + Kit Acessórios",
            4: "R$ 1.499,90", // Valor total
            5: "2-3 dias úteis", // Prazo de entrega
            6: "Pix (5% de desconto)", // Forma de pagamento
            7: "portalferragem.shop/rastreio/PF-2024-04567", // Link de rastreio
          }),
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
        {loading ? "Enviando..." : "Enviar Demonstração ao Cliente"}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold text-primary-black mb-2">
            Resultado:
          </h3>
          <pre className="text-sm text-black whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
