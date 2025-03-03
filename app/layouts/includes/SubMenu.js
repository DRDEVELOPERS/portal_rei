"use client";

export default function SubMenu() {
  const menuItems = [
    { id: 1, name: "Home" },
    { id: 2, name: "Todos os Departamentos" },
    { id: 3, name: "Ferramentas" },
    { id: 4, name: "Eletrônicos" },
    { id: 5, name: "Praia & Piscina" },
    { id: 6, name: "Materiais Elétricos" },
    { id: 7, name: "Iluminação" },
    { id: 8, name: "Casa & Decoração" },
    { id: 9, name: "Eletroportáteis" },
    // { id: 10, name: "Casa & Jardim" },
    // { id: 11, name: "Reparos & Reformas" },
  ];

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4">
        <ul className="flex items-center gap-4 overflow-x-auto py-3 text-sm hide-scrollbar">
          {menuItems.map((item) => (
            <li key={item.id} className="shrink-0 group relative">
              <button className="px-3 py-2 text-primary-black dark:text-gray-300 hover:text-primary-yellow transition-colors duration-200 font-medium">
                {item.name}
              </button>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
