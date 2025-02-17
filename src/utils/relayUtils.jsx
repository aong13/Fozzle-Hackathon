export const handlePrevious = (allRelay, tickleId, relayId, navigate) => {
  const currentIndex = allRelay.indexOf(tickleId); // Look for tickleId in the allRelay array
  if (currentIndex > 0) {
    const previousTickleId = allRelay[currentIndex - 1];
    navigate(`/relay/${relayId}/story/${previousTickleId}`);
  }
};

export const handleNext = (allRelay, tickleId, relayId, navigate) => {
  const currentIndex = allRelay.indexOf(tickleId); // Look for tickleId in the allRelay array
  if (currentIndex < allRelay.length - 1) {
    const nextTickleId = allRelay[currentIndex + 1];
    navigate(`/relay/${relayId}/story/${nextTickleId}`);
  }
};
export const calculateImgRatio = (imageUrl, callback) => {
  const img = new Image();
  img.src = imageUrl;
  img.onload = () => {
    const ratio = img.width / img.height;
    callback(ratio);
  };
};
