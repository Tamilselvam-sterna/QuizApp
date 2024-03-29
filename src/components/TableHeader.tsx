import { Button, Input } from "@mantine/core";

interface TableHeaderType {
  reference: React.RefObject<HTMLInputElement>;
  title: string;
  onSubmit: () => void;
  HeaderComponents: React.JSX.Element[];
}

function TableHeader({
  reference,
  title,
  onSubmit,
  HeaderComponents,
}: TableHeaderType) {
  return (
    <div className="flex p-2 mb-2 compact">
      <div className="pl-2 pr-8 text-xl font-bold">{title}</div>
      <section className="flex flex-row justify-end w-full">
        {HeaderComponents.map((element, index) => (
          <div className="mr-5" key={index}>
            {element}
          </div>
        ))}
        <section className="flex mr-5">
          <Input
            placeholder="Search"
            size="compact-md"
            radius="md"
            ref={reference}
          />
          <div className="w-20 px-2 ml-1">
            <Button type="button" size="sm" onClick={onSubmit}>
              Search
            </Button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default TableHeader;
