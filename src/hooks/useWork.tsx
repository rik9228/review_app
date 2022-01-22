import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "src/lib/firebase";
import { Work } from "src/types/Work";

export const useWork = () => {
  const [work, setWork] = useState<Work>();
  const [isLoading, setIsLoading] = useState(false);
  const {
    query: { workId },
  } = useRouter();

  useEffect(() => {
    let unsubscribe = () => {};
    const getWorks = () => {
      setIsLoading(true);
      const ref = doc(db, "works", workId as string);
      unsubscribe = onSnapshot(ref, (snapshot) => {
        const work = snapshot.data();

        setWork({
          id: snapshot.id,
          userId: work.userId,
          createdAt: work.createdAt,
          iFrameLink: work.iFrameLink,
          image: work.image,
          shareLink: work.shareLink,
          title: work.title,
          description: work.description,
        });
        setIsLoading(false);
      });
    };
    getWorks();
    return () => unsubscribe();
  }, []);

  return { work, isLoading };
};
