'use client';

import { Range } from 'react-date-range';

import Heading from '@/src/components/Heading';
import Calendar from '@/src/components/Inputs/Calendar';

type SearchModelDateProps = {
  dateRange: Range;
  onSelect: (value: Range) => void;
};

const SearchModelDateBody: React.FC<SearchModelDateProps> = ({
  dateRange,
  onSelect,
}) => {
  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title='When do you plan to go?'
        subtitle='Make sure everyone is free'
      />
      <Calendar
        value={dateRange}
        onChange={(value) => onSelect(value.selection)}
      />
    </div>
  );
};

export default SearchModelDateBody;
