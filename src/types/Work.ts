import { Timestamp } from "@firebase/firestore";
export type Work = {
  createdAt: Timestamp;
  createdBy: string;
  imgSrc: string;
  shareLink: string;
  title: string;
  userId: string;
};
