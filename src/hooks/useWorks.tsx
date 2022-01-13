import { db } from "../lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
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
        const fetchedWorks: Work[] = workDocs.map((workDoc) => ({
          id: workDoc.id,
          createdAt: workDoc.data().createdAt,
          imgSrc: workDoc.data().image,
          shareLink: workDoc.data().shareLink,
          title: workDoc.data().title,
          userId: workDoc.data().userId,
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
