"use client";

export default function Footer() {
  return (
    <footer className="border-t mt-20 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Buy Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-primary-black dark:text-primary-yellow text-lg mb-2">
              Compras
            </h3>
            <ul className="space-y-2">
              {[
                "Cadastrar-se",
                "Política de Devolução e Trocas",
                "Compra Garantida",
                "Nossas Lojas",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-yellow transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sell Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-primary-black dark:text-primary-yellow text-lg mb-2">
              Franquias
            </h3>
            <ul className="space-y-2">
              {[
                "Seja um Franqueado",
                "Formulário de Proposta",
                "Como Funciona?",
                "Seja um Fornecedor",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-yellow transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div className="space-y-3 col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-primary-black dark:text-primary-yellow text-lg mb-2">
              Sobre a Portal
            </h3>
            <ul className="space-y-2">
              {["Conheça", "Novidades", "Nosa Empresa", "Trabalhe Conosco"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-yellow transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-primary-black dark:text-primary-yellow text-lg mb-2">
              Suporte
            </h3>
            <ul className="space-y-2">
              {["Atendimento", "E-mail", "Chat"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-yellow transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-primary-black dark:text-primary-yellow text-lg mb-2">
              Pol[itica & Privacidade]
            </h3>
            <ul className="space-y-2">
              {[
                "Termos & Condições",
                "Política de Troca",
                "Configurações de Cookies",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-yellow transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} PORTALFERRAGEM.shop
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-yellow transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-yellow transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-yellow transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* privacy and policies */}
        <div className="mt-12 pt-8 border-t border-yellow-200 dark:border-yellow-800">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex space-x-6">
              <p>
                Preços e condições de pagamento exclusivos para compras via
                internet, podendo variar nas lojas físicas. Ofertas válidas na
                compra de até 5 peças de cada produto por cliente, até o término
                dos nossos estoques para internet. Caso os produtos apresentem
                divergências de valores, o preço válido é o da sacola de
                compras. Vendas sujeitas a análise e confirmação de dados.
              </p>
            </div>
            <div className="flex space-x-6">
              <p>
                PORTAL MATERIAIS ELETRICOS LTDA - CNPJ: 08.455.315/0001-35
                Endereço: Rod. João Gualberto Soares, 7177 - São João do Rio
                Vermelho, Florianópolis/SC - CEP 88.060-000 ®
                PortalFerragem.shop – Todos os direitos reservados. Endereço
                eletrônico: https://www.portalferragem.shop Fale conosco:
                https://www.portalferragem.com.br/central-de-atendimento/fale-conosco/
              </p>
            </div>
          </div>
        </div>
        {/* endof*/}
      </div>
    </footer>
  );
}
