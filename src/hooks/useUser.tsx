import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "src/lib/AuthProvider";
import { db } from "src/lib/firebase";

const useUser = () => {
  const [user, setUser] = useState<any>();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const fetchUser = async () => {
        const docRef = doc(db, "users", currentUser.uid);
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
    } else {
      return;
    }
  }, [currentUser]);

  return { user, currentUser };
};

export default useUser;
