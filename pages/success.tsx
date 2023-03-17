import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import confetti from 'canvas-confetti';
const Success = () => {
  const router = useRouter();
  if (typeof window !== 'undefined') localStorage.clear();

  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);

  return (
    <div className='w-full h-full'>
      <div className='flex flex-col items-center gap-4 m-auto p-2 text-center text-slate-700 mt-40 w-3/5 h-96 bg-gray-200 rounded-lg'>
        <span className='inline-block'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='w-20 h-20 fill-lime-500 stroke-1'>
            <path stroke-linecap='round' stroke-linejoin='round' d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
          </svg>
        </span>
        <div className=''>
          <p className='font-bold text-[44px] p-2'>Thank You For Your Purchase</p>
          <p className='text-md font-normal'>Please check your email for your receipt</p>
        </div>
        <p className='text-md font-normal'>
          If you have any question email to <span className='text-red-700'>support@soundstudio.com</span>
        </p>
        <button
          onClick={() => {
            router.push('/');
          }}
          className='mt-8 w-44 h-10 rounded-lg bg-red-700 text-white font-bold text-lg drop-shadow-md hover:scale-105 ease-in-out duration-300'
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Success;
