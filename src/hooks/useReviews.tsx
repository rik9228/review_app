import { db } from "../lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useReviews = (workId) => {
  const [reviews, setReviews] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};
    const getReviews = () => {
      setIsLoading(true);
      const worksQuery = query(collection(db, `works/${workId}/reviews/`));
      unsubscribe = onSnapshot(worksQuery, (snapshot) => {
        setIsLoading(false);
        const reviewDocs = snapshot.docs;

        const fetchedReviews: any[] = reviewDocs.map((reviewDoc) => ({
          createdAt: reviewDoc.data().createdAt,
          reviewedBy: reviewDoc.data().reviewedBy,
          description: reviewDoc.data().description,
          userInfo: reviewDoc.data().userInfo,
          docId: reviewDoc.id,
        }));

        // 日付の降順に並べ替え
        const sortedReviews = fetchedReviews.sort((a, b) => {
          return a.createdAt.seconds < b.createdAt.seconds ? -1 : 1;
        });

        setReviews(sortedReviews);
      });
    };
    getReviews();
    return () => unsubscribe();
  }, []);
  return { reviews, isLoading };
};

export default useReviews;
