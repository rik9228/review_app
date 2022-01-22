import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "src/lib/firebase";

const useUser = (userId: string) => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser({
          displayName: docSnap.data().displayName,
          isOnline: docSnap.data().isOnline,
          classNumber: docSnap.data().classNumber,
          profileImg: docSnap.data().profileImg,
        });
      } else {
        console.log("No such document!");
      }
    };
    fetchUser();
  }, [userId]);

  return { user };
};

export default useUser;
