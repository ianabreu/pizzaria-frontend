export type OrderProps = {
  id: string;
  table: number;
  status: boolean;
  draft: boolean;
  name: string | null;
};
interface OrderItemProps {
  order: OrderProps;
  onClick: (id: string) => void;
}

export function OrderItem({
  order: { id, name, table, draft, status },
  onClick,
}: OrderItemProps) {
  return (
    <section className="bg-input h-auto rounded-md overflow-hidden">
      <button
        className="text-base h-14 items-center gap-4 flex w-full"
        onClick={() => onClick(id)}
      >
        <div className="w-[0.5rem] h-full bg-secondary"></div>
        <span className="text-foreground">Mesa {table}</span>
      </button>
    </section>
  );
}
