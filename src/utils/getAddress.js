export function getAddressURL(address) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const destination = encodeURIComponent(address);

    // return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

    return isIOS
        ? `https://maps.apple.com/?daddr=${destination}`
        : `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
};