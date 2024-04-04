import { db } from "@/firebaseConfig";
import { FileType } from "@/types";
import { auth } from "@clerk/nextjs"
import { collection, getDocs } from "firebase/firestore";
import TableWrapper from "./_componenets/table/TableWrapper";
const Files = async () => {
  const { userId } = auth();
  const docsResult = await getDocs(collection(db, "users", userId!, "files"));
  console.log("doc result",docsResult);
  const skeletonFiles: FileType[] = docsResult.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadUrl: doc.data().downloadUrl,
    type: doc.data().type,
    size: doc.data().size,
    password: doc.data().password
  }));
  return (
      <section className="container space-y-5 mt-6">
        <h2 className="font-bold">All Files</h2>
        <div>
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
  )
}

export default Files