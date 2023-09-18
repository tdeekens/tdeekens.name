type TDishesProps = {
  images: Array<{
    src: string;
  }>;
};

import Image from 'next/image';

function Dishes(props: TDishesProps) {
  return (
    <div className="container py-5 mx-auto">
      <div className="flex flex-wrap -m-1 md:-m-2">
        <div className="flex flex-wrap w-1/2">
          <div className="w-1/2 p-1 md:p-2">
            <Image
              height={500}
              width={600}
              src={props.images[0].src}
              alt="A dish I cooked"
              className="block object-cover object-center w-full h-full rounded-lg"
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <Image
              height={500}
              width={600}
              src={props.images[1].src}
              alt="A dish I cooked"
              className="block object-cover object-center w-full h-full rounded-lg"
            />
          </div>
          <div className="w-full p-1 md:p-2">
            <Image
              height={500}
              width={600}
              src={props.images[2].src}
              alt="A dish I cooked"
              className="block object-cover object-center w-full h-full rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-wrap w-1/2">
          <div className="w-full p-1 md:p-2">
            <Image
              height={500}
              width={600}
              src={props.images[3].src}
              alt="A dish I cooked"
              className="block object-cover object-center w-full h-full rounded-lg"
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <Image
              height={500}
              width={600}
              src={props.images[4].src}
              alt="A dish I cooked"
              className="block object-cover object-center w-full h-full rounded-lg"
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <Image
              height={500}
              width={600}
              src={props.images[5].src}
              alt="A dish I cooked"
              className="block object-cover object-center w-full h-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dishes;
