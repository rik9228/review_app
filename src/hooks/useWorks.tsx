import { db } from "../lib/firebase";
import { collection, onSnapshot, query, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Work } from "../types/Work";

function useWorks(): { works: Work[]; isLoading: boolean } {
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};
    const getWorks = () => {
      setIsLoading(true);
      const worksQuery = query(collection(db, "works"));
      unsubscribe = onSnapshot(worksQuery, (snapshot) => {
        setIsLoading(false);
        const workDocs = snapshot.docs;
        const fetchedWorks = workDocs.map((workDoc) => ({
          id: workDoc.id as string,
          createdAt: workDoc.data().createdAt as Timestamp,
          image: workDoc.data().image as string,
          iFrameLink: workDoc.data().iFrameLink as string,
          shareLink: workDoc.data().shareLink as string,
          title: workDoc.data().title as string,
          userId: workDoc.data().userId as string,
        }));

        setWorks(fetchedWorks);
      });
    };
    getWorks();
    return () => unsubscribe();
  }, []);
  return { works, isLoading };
}

export default useWorks;
