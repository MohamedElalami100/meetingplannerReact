import RoomCard from "./RoomCard";

interface Room {
  id: string;
  name: string;
  capacity: number;
  roomEquipments: string[];
  availableHours: string[];
}

interface ResultsSectionProps {
  room: Room;
}

export default function ResultsSection({ room }: ResultsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RoomCard key={room.id} room={room} />
    </div>
  );
}
