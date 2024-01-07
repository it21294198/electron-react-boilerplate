// // import React, { useState, useEffect } from 'react';
// // import { MyComponent, AppStateProvider } from "../context/MyComponent";

// // function Overview() {
// //   const [imageName, setImageName] = useState('image');
// //   const [image, setImage] = useState(null);

// //   useEffect(() => {
// //     const loadImage = async () => {
// //       try {
// //         const dynamicImage = await import(`../../main/uploads/${imageName}.png`);
// //         setImage(dynamicImage.default);
// //       } catch (error) {
// //         console.error('Error loading image:', error);
// //       }
// //     };

// //     loadImage();
// //   }, [imageName]);

// //   const change = () => {
// //     setImageName('image2');
// //   };

// //   return (
// //     <div>
// //       {/* Uncomment the following lines if needed */}
// //       {/* <AppStateProvider>
// //         <MyComponent />
// //       </AppStateProvider> */}
// //       {image && <img src={image} alt={imageName} />}
// //       <button onClick={change}>Change</button>
// //     </div>
// //   );
// // }

// // export default Overview;

// import React, { useState, useEffect } from 'react';
// import { MyComponent, AppStateProvider } from "../context/MyComponent";

// function Overview() {
//   const [imageIndex, setImageIndex] = useState(0);
//   const [currentImage, setCurrentImage] = useState(null);
//   const [filesCount, setGetFilesCount] = useState(0);

//   useEffect(() => {
//     const loadImage = async () => {
//       try {
//         const dynamicImage = await import(`../../main/uploads/image${imageIndex}.png`);
//         setCurrentImage(dynamicImage.default);
//       } catch (error) {
//         console.error('Error loading image:', error);
//         setCurrentImage(null); // Set current image to null if there's an error
//       }
//     };

//     window.electron.ipcRenderer.sendMessage('getFilesCount')
//     window.electron.ipcRenderer.once('getFilesCountResponse',(e)=>{
//       console.log(e)
//       setGetFilesCount(e.fileCount)
//     })

//     loadImage();
//   }, [imageIndex]);

//   const changeImage = () => {
//     setImageIndex((prevIndex) => (prevIndex + 1) % filesCount ); // Cycle through images 0 to 4
//   };

//   return (
//     <div>
//       {/* Uncomment the following lines if needed */}
//       {/* <AppStateProvider>
//         <MyComponent />
//       </AppStateProvider> */}
//       {currentImage !== null ? (
//         <img src={currentImage} alt={`image${imageIndex}`} width="100px" height="100px"/>
//       ) : (
//         <p>No image found or uploads folder does not exist</p>
//       )}
//       <button onClick={changeImage}>Change Image</button>
//     </div>
//   );
// }

// export default Overview;

import React from 'react'

export default function Overview() {
  return (
    <div>Overview</div>
  )
}

