"use client";
export const getTimeDifference = (createdAt: any): any => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInMilliseconds = now.getTime() - createdDate.getTime();

  const minutes = Math.floor(diffInMilliseconds / 60000);
  const hours = Math.floor(diffInMilliseconds / 3600000);
  const days = Math.floor(diffInMilliseconds / 86400000);

  if (hours < 1) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};
