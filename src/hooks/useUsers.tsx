import { db } from "../lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { User } from "src/types/User";

function useUsers(): { users: User[]; isLoading: boolean } {
  const [users, setUsers] = useState<User[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};
    const getWorks = () => {
      setIsLoading(true);
      const worksQuery = query(collection(db, "users"));
      unsubscribe = onSnapshot(worksQuery, (snapshot) => {
        setIsLoading(false);
        const workDocs = snapshot.docs;
        const fetchedUsers: User[] = workDocs.map((userDoc) => ({
          bio: userDoc.data().bio,
          classNumber: userDoc.data().classNumber,
          displayName: userDoc.data().displayName,
          isOnline: userDoc.data().isOnline,
          profileImg: userDoc.data().profileImg,
          userId: userDoc.data().userId,
        }));

        setUsers(fetchedUsers);
      });
      1;
    };
    getWorks();
    return () => unsubscribe();
  }, []);
  return { users, isLoading };
}

export default useUsers;
