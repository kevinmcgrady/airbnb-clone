'use client';

import Heading from '@/src/components/Heading';
import CategoryInput from '@/src/components/Inputs/CategoryInput';
import { CategoryType } from '@/src/types/Category';
import { CreateListingRequest } from '@/src/validators/CreateListing';

type RentModelCategoryBodyProps = {
  categories: CategoryType[];
  category: string;
  onSelect: (id: keyof CreateListingRequest, value: any) => void;
};

const RentModelCategoryBody: React.FC<RentModelCategoryBodyProps> = ({
  categories,
  category,
  onSelect,
}) => {
  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Which of these best describes your place?'
        subtitle='Pick a category'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {categories.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={(category) => onSelect('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentModelCategoryBody;
