export function Card() {
  return (
    // <div className="rounded-xl bg-gray-500 p-2 shadow-sm">
    //   <div className="flex p-4">
    //     {/* {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null} */}
    //     <h3 className="ml-2 text-lg font-medium text-white">{title}</h3>
    //   </div>
    //   <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
    //     {value}
    //   </p>
    // </div>
    <div>
      <div>Subject Name</div>
      <div>
        <div className="flex justify-start items-center gap-2">
          <div className="rounded-full w-2 h-2 bg-gray-600" />
          <div>Total Users</div>
        </div>
        <div className="flex justify-start items-center gap-2">
          <div className="rounded-full w-2 h-2 bg-orange-400" />
          <div>Test Assigned</div>
        </div>
        <div className="flex justify-start items-center gap-2">
          <div className="rounded-full w-3 h-3 bg-green-600" />
          <div>Completed Users</div>
        </div>
      </div>
    </div>
  );
}

export default function CardWrapper() {
  return <Card />;
}
