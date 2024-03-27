import { fetchDinoData } from "@/app/lib/utils";
import PageLoading from "@/app/ui/PageLoading";
import Image from "next/image";
import { Suspense } from "react";

const DinoDataTablePage = async () => {
  const dinosaurs = await fetchDinoData();

  return (
    <Suspense fallback={<PageLoading />}>
      <main className="w-full bg-white min-h-[50vh]">
        <div className="overflow-x-auto rounded-lg shadow mb-10">
          <table className="w-full min-w-[800px] text-left text-gray-500 dark:text-gray-400">
            <thead>
              <tr className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 uppercase font-medium track-wider">
                <th className="p-4">Name</th>
                <th className="p-4">Image</th>
                <th className="p-4">Type</th>
                <th className="p-4">Length (m)</th>
                <th className="p-4">Weight (Kg)</th>
                <th className="p-4">Diet</th>
                <th className="p-4">Lived</th>
                <th className="p-4">Found In</th>
              </tr>
            </thead>
            <tbody>
              {dinosaurs?.map((dinosaur) => (
                <tr
                  key={dinosaur?.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <td className="p-4">{dinosaur?.name}</td>
                  <td className="p-4">
                    {dinosaur.imageSrc.toLowerCase().includes("https") ? (
                      <Image
                        src={dinosaur?.imageSrc}
                        alt={`${dinosaur?.name} image`}
                        width={1400}
                        height={1000}
                        loading="lazy"
                        className="w-16 h-16 rounded-sm object-cover mx-auto"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="p-4">{dinosaur?.typeOfDinosaur}</td>
                  <td className="p-4">{dinosaur?.length}</td>
                  <td className="p-4">{dinosaur?.weight}</td>
                  <td className="p-4">{dinosaur?.diet}</td>
                  <td className="p-4">{dinosaur?.whenLived}</td>
                  <td className="p-4">{dinosaur?.foundIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Suspense>
  );
};

export default DinoDataTablePage;
