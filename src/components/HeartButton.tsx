'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User } from 'next-auth';
import { toast } from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useLoginModel from '@/src/hooks/useLoginModel';

type HeartButtonProps = {
  listingId: string;
  currentUser?: User | null;
  hasFavorited?: boolean;
  isLoggedIn?: boolean;
};

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  hasFavorited,
  isLoggedIn,
}) => {
  const router = useRouter();
  const loginModel = useLoginModel();

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async () => {
      const data = await axios.post(`/api/favorites/${listingId}`);
      return data;
    },
    onError: () => {
      toast.error('Could not favorite');
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div
      onClick={isLoggedIn ? () => toggleFavorite() : loginModel.onOpen}
      className='relative hover:opacity-80 transition cursor-pointer'
    >
      <AiOutlineHeart
        size={28}
        className='fill-white absolute -top-[2px] -right-[2px]'
      />
      <AiFillHeart
        size={24}
        className={`${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}`}
      />
    </div>
  );
};

export default HeartButton;
