import { Button, Input } from "@mantine/core";

interface TableHeaderType {
  reference: React.RefObject<HTMLInputElement>;
  title: string;
  onSubmit: () => void;
  HeaderComponents?: React.JSX.Element[];
}

function TableHeader({
  reference,
  title,
  onSubmit,
  HeaderComponents,
}: TableHeaderType) {
  return (
    <div className="mb-2 flex whitespace-nowrap p-2">
      <h1 className="mb-4 text-xl font-bold md:text-2xl">{title}</h1>
      <section className="flex w-full flex-row justify-end">
        {HeaderComponents?.map((element, index) => (
          <div className="mr-5" key={index}>
            {element}
          </div>
        ))}
        <section className="mr-5 flex">
          <Input
            placeholder="Search"
            size="compact-md"
            radius="md"
            ref={reference}
          />
          <div className="ml-1 w-20 px-2">
            <Button
              type="button"
              variant="filled"
              color="gray"
              size="sm"
              onClick={onSubmit}
            >
              Search
            </Button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default TableHeader;
