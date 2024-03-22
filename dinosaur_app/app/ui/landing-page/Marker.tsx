import { DinoDataType } from "@/app/lib/definitions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

const Marker = ({
  count,
  foundIn,
  relativeData,
}: {
  count: number;
  foundIn: string;
  relativeData: DinoDataType;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className=" bg-orange-500 bg-opacity-50 font-semibold rounded-full flex items-center justify-center p-[1px] border border-orange-600">
          <span className=" w-8 h-8 rounded-full bg-orange-400 border border-orange-600 text-center flex items-center justify-center">
            {count}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={"w-[300px]  border border-black"}>
        <div className="w-full flex flex-col items-center border-4 border-orange-300 rounded-xl">
          <Image
            src={relativeData.imageSrc}
            alt={`click to read more on Dinosaurs dicovered in ${foundIn}`}
            width={1376}
            height={768}
            className="w-auto h-[150px]"
          />
          <DropdownMenuSeparator />

          <div className="w-full bg-black text-white flex flex-col items-center p-2 gap-4 rounded-lg rounded-t-none">
            <p className="w-full">
              <span className="text-sm">
                In {foundIn}, <strong>{count}</strong> dinos were discovered.
              </span>
              <hr className="w-[90%]" />
              <span>
                The image above shows the <strong>{relativeData.name}</strong>{" "}
                of the species <strong>{relativeData.typeSpecies}</strong>. It
                was one of the discovered dinos in {foundIn}. finding this
                interesting?
              </span>
            </p>

            <Link
              href={`/explore-dino/?foundIn=${foundIn}`}
              className="p-2 whitespace-nowrap text-white font-bold rounded-lg max-w-full overflow-hidden text-ellipsis bg-orange-300"
            >
              Dig Deeper
            </Link>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Marker;
