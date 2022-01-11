import { Timestamp } from "@firebase/firestore";
export type Work = {
  id: string;
  createdAt: Timestamp;
  imgSrc: string;
  shareLink: string;
  title: string;
  userId: string;
};
