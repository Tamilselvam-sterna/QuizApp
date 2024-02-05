// import React, { useEffect } from "react";

// const Sample = () => {
//   useEffect(() => {
//     const reloadAndNavigateHome = () => {
//       // Reload the browser after 5 seconds
//       setTimeout(() => {
//         window.location.reload(true); // Passing true forces a reload from the server

//         // Set the URL to the home page
//         window.location.href = "/"; // Update this with your home page URL
//       }, 5000); // 5000 milliseconds (5 seconds)
//     };

//     // Call the function when the component mounts
//     reloadAndNavigateHome();
//   }, []); // Empty dependency array ensures that this effect runs only once

//   return (
//     <div>
//       <h1>Reload and Navigate to Home Page</h1>
//       <p>Reloading in 5 seconds...</p>
//     </div>
//   );
// };

// export default Sample;

// import React, { useEffect, useState } from "react";

// const Sample = () => {
//   const [hasReloaded, setHasReloaded] = useState(false);

//   useEffect(() => {
//     if (!hasReloaded) {
//       const reloadAndNavigateHome = () => {
//         // Reload the browser
//         window.location.reload(true); // Passing true forces a reload from the server

//         // Set the URL to the home page
//         window.location.href = "/"; // Update this with your home page URL
//       };

//       // Call the function when the component mounts
//       reloadAndNavigateHome();

//       // Set hasReloaded to true to prevent further reloads
//       setHasReloaded(true);
//     }
//   }, [hasReloaded]);

//   return (
//     <div>
//       <h1>Reload and Navigate to Home Page</h1>
//       <p>Reloading...</p>
//     </div>
//   );
// };

// export default Sample;

// import React, { useEffect } from "react";

// const Sample = () => {
//   useEffect(() => {
//     const reloadAndNavigateHome = () => {
//       // Reload the browser
//       window.location.reload(); // Passing true forces a reload from the server
//     };

//     // Call the function when the component mounts
//     reloadAndNavigateHome();
//   }, []); // Empty dependency array ensures that this effect runs only once

//   return (
//     <div>
//       <h1>Reload and Navigate to Home Page</h1>
//       <p>Reloading...</p>
//     </div>
//   );
// };

// export default Sample;
