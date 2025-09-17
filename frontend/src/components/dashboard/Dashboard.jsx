import ContractTable from "./ContractTable";
import ContractCard from "./ContractCard";

export default function Dashboard({ contracts }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Contracts Overview</h1>
      <div className="hidden md:block">
        <ContractTable contracts={contracts} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-4">
        {contracts.map((c) => (
          <ContractCard key={c.doc_id} contract={c} />
        ))}
      </div>
    </div>
  );
}
