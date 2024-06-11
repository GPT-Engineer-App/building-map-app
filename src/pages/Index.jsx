import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box, Text, VStack, Card, CardBody, HStack, Icon } from "@chakra-ui/react";
import { FaTemperatureHigh, FaTint, FaUserFriends } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icon for the markers
const pinIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const buildings = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `Building ${i + 1}`,
  position: [
    59.91 + Math.random() * 0.1 - 0.05,
    10.75 + Math.random() * 0.1 - 0.05,
  ],
  sensors: {
    temperature: (20 + Math.random() * 5).toFixed(1),
    humidity: (50 + Math.random() * 10).toFixed(1),
    occupancy: Math.floor(Math.random() * 100),
  },
}));

const Index = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  return (
    <Box position="relative" width="100vw" height="100vh">
      <MapContainer center={[59.91, 10.75]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {buildings.map((building) => (
          <Marker
            key={building.id}
            position={building.position}
            icon={pinIcon}
            eventHandlers={{
              click: () => {
                setSelectedBuilding(building);
              },
            }}
          >
            <Popup>{building.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedBuilding && (
        <Card position="absolute" top="10" left="10" width="300px" zIndex="1000" boxShadow="xl" borderRadius="md" overflow="hidden">
          <CardBody>
            <VStack spacing={4}>
              <Text fontSize="2xl" fontWeight="bold" color="teal.500">{selectedBuilding.name}</Text>
              <HStack>
                <Icon as={FaTemperatureHigh} color="red.500" />
                <Text>Temperature: {selectedBuilding.sensors.temperature} °C</Text>
              </HStack>
              <HStack>
                <Icon as={FaTint} color="blue.500" />
                <Text>Humidity: {selectedBuilding.sensors.humidity} %</Text>
              </HStack>
              <HStack>
                <Icon as={FaUserFriends} color="green.500" />
                <Text>Occupancy: {selectedBuilding.sensors.occupancy} people</Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default Index;