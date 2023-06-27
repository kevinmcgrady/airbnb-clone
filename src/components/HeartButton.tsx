'use client';

import { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useLoginModel from '@/src/hooks/useLoginModel';

type HeartButtonProps = {
  listingId: string;
  currentUser?: User | null;
};

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const router = useRouter();
  const loginModel = useLoginModel();
  const hasFavorited = currentUser?.favoriteIds.includes(listingId);

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
      onClick={currentUser ? () => toggleFavorite() : loginModel.onOpen}
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
