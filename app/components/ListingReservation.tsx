'use client';

import Button from './Button';
import Calendar from './Calendar';

type ListingReservationProps = {
  price: number;
  totalPrice: number;
  onChangeDate: (value: any) => void;
  dateRange: any;
  onSubmit: () => void;
  disabled?: boolean;
  disableDates: Date[];
};

const ListingReservation: React.FC<ListingReservationProps> = ({
  dateRange,
  disableDates,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
  disabled,
}) => {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
      <div className='flex flex-row items-center gap-1 p-4'>
        <h3 className='text-2xl font-semibold'>£ {price}</h3>
        <p className='font-light text-neutral-600'>per night</p>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disableDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <div className='p-4'>
        <Button disabled={disabled} label='Reserve' onClick={onSubmit}></Button>
      </div>
      <hr />
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <p>Total</p>
        <p>£ {totalPrice}</p>
      </div>
    </div>
  );
};

export default ListingReservation;
