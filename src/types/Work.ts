import { Timestamp } from "@firebase/firestore";
export type Work = {
  id?: string;
  description?: string;
  image: string;
  shareLink: string;
  iFrameLink: string;
  title: string;
  createdAt: Timestamp;
  userId?: string;
};
