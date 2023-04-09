const baseUrl = import.meta.env.MEDIA_URL;

export const formatSrc = (responseSrc: string) => {
  return baseUrl + responseSrc;
};

export const fomartVideoSrc = (responseSrc: string) => {
  return baseUrl + responseSrc;
};
