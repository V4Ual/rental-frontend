export const convertMin = (seconds) => {
    const minutes = Math.floor(seconds / 60); // Calculate full minutes
    const remainingSeconds = seconds % 60; // Get the remaining seconds
  
    return `${minutes}:${remainingSeconds}`
  }