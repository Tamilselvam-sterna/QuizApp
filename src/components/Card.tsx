export function Card() {
  return (
    <div>
      <div>Subject Name</div>
      <div>
        <div className="flex items-center justify-start gap-2">
          <div className="h-2 w-2 rounded-full bg-gray-600" />
          <div>Total Users</div>
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="h-2 w-2 rounded-full bg-orange-400" />
          <div>Test Assigned</div>
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="h-3 w-3 rounded-full bg-green-600" />
          <div>Completed Users</div>
        </div>
      </div>
    </div>
  );
}

export default function CardWrapper() {
  return <Card />;
}
