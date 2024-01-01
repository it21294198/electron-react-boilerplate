import React, { useState, useEffect } from 'react';
import { MyComponent, AppStateProvider } from "../context/MyComponent";

function Overview() {
  const [imageName, setImageName] = useState('image');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const dynamicImage = await import(`../../main/uploads/${imageName}.png`);
        setImage(dynamicImage.default);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, [imageName]);

  const change = () => {
    setImageName('image2');
  };

  return (
    <div>
      {/* Uncomment the following lines if needed */}
      {/* <AppStateProvider>
        <MyComponent />
      </AppStateProvider> */}
      {image && <img src={image} alt={imageName} />}
      <button onClick={change}>Change</button>
    </div>
  );
}

export default Overview;
