'use client';

import Heading from '@/src/components/Heading';
import ImageUpload from '@/src/components/Inputs/ImageUpload';
import { CreateListingRequest } from '@/src/validators/CreateListing';

type RentModelImageProps = {
  onSelect: (id: keyof CreateListingRequest, value: any) => void;
  imageSrc: string;
};

const RentModelImageBody: React.FC<RentModelImageProps> = ({
  onSelect,
  imageSrc,
}) => {
  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Add a photo of your place'
        subtitle='Show guests what your place looks like'
      />
      <ImageUpload
        onChange={(value) => onSelect('imageSrc', value)}
        value={imageSrc}
      />
    </div>
  );
};

export default RentModelImageBody;
