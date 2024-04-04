import Constant from "@/Constant";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today<br/>With Cloud Storage</h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500 dark:text-white">
                    {Constant.slag}
                </p>

                \<div className="mb-0 mt-6 space-y-4 sm:p-6 lg:p-8">
                <SignUp />
                </div>
            </div>
        </div>
  );
}