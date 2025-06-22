// src/components/common/MapComponent.tsx

import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// พิกัดของ True Digital Park
const center = {
  lat: 13.682856,
  lng: 100.612781
};

const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "ใส่ตอนหลัง api google" // <== ใส่ API Key ของคุณที่นี่
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17} // ปรับระดับการซูมได้ตามต้องการ
      options={{ // ปิด UI ที่ไม่จำเป็นของ Google Map
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {/* เพิ่ม Marker ที่ตำแหน่งที่เราต้องการ */}
      <MarkerF position={center} />
    </GoogleMap>
  );
};

export default MapComponent;