export const formatPhoneNumber = (phoneNumber: string | undefined): string => {
  if (!phoneNumber) return '';
  
  // Format: (XXX) XXX-XXXX
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  
  return phoneNumber;
};

export const formatDNI = (dni: string | undefined): string => {
  if (!dni) return '';
  
  // Format: XX-XXXXXXX-X
  const cleaned = ('' + dni).replace(/\D/g, '');
  
  if (cleaned.length === 8) {
    return cleaned.slice(0, 2) + '-' + cleaned.slice(2, 7) + '-' + cleaned.slice(7);
  }
  
  return dni;
};

export const capitalizeFirstLetter = (string: string | undefined): string => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};