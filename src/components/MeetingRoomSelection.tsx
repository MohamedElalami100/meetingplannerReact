import { useState } from "react";
import FiltersSection from "./FiltersSection";
import ResultsSection from "./ResultsSection";
import ErrorOrEmptyState from "./ErrorOrEmptyState";

interface Room {
  id: string;
  name: string;
  capacity: number;
  roomEquipments: string[];
  availableHours: string[];
}

export default function MeetingRoomSelection() {
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const api_url = "http://localhost:8080";

  const handleSearch = async (
    meetingType: string,
    capacity: number,
    date: Date
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${api_url}/api/rooms/best-room-with-available-hours?meetingType=${meetingType}&requiredCapacity=${capacity}&meetingDate=${
          date.toISOString().split("T")[0]
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }

      const data: Room = await response.json();
      setRoom(data);
    } catch (err) {
      setError("No rooms available for the selected criteria.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <FiltersSection onSearch={handleSearch} />
      {isLoading ? (
        <p className="text-center py-4">Loading...</p>
      ) : error ? (
        <ErrorOrEmptyState message={error} />
      ) : room ? (
        <ResultsSection room={room} />
      ) : (
        <ErrorOrEmptyState message="No rooms available for the selected criteria." />
      )}
    </div>
  );
}
