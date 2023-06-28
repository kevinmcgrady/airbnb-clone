'use client';

import Select from 'react-select';

import useCountries from '@/src/hooks/useCountries';
import { CountrySelectType } from '@/src/types/CountrySelect';

type CountrySelectProps = {
  value?: CountrySelectType | null;
  onChange: (value: CountrySelectType) => void;
};

const CountrySelect: React.FC<CountrySelectProps> = ({ onChange, value }) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder='Anywhere'
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectType)}
        formatOptionLabel={(option: any) => (
          <div className='flex flex-row items-center gap-3'>
            <div>{option.flag}</div>
            <div>
              {option.label},{' '}
              <span className='text-neutral-500 ml-1'>{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
