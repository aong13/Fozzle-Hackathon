export const handlePrevious = (allRelay, tickleId, relayId, navigate) => {
  const currentIndex = allRelay.findIndex((item) => item.tickleId === tickleId);
  if (currentIndex > 0) {
    const previousTickleId = allRelay[currentIndex - 1].tickleId;
    navigate(`/relay/${relayId}/tickle/${previousTickleId}`);
  }
};

export const handleNext = (allRelay, tickleId, relayId, navigate) => {
  const currentIndex = allRelay.findIndex((item) => item.tickleId === tickleId);
  if (currentIndex < allRelay.length - 1) {
    const nextTickleId = allRelay[currentIndex + 1].tickleId;
    navigate(`/relay/${relayId}/tickle/${nextTickleId}`);
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
