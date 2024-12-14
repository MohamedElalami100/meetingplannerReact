import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Room {
  id: string;
  name: string;
  capacity: number;
  roomEquipments: string[];
  availableHours: string[];
}

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          Capacity: {room.capacity}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {room.roomEquipments.map((item, index) => (
            <Badge key={index} variant="secondary">
              {item}
            </Badge>
          ))}
        </div>
        <p className="text-sm">
          Available slots: {room.availableHours.join(", ")}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Select</Button>
      </CardFooter>
    </Card>
  );
}
