import React from 'react';
import useSse from '../hooks/useSse';
import useAuth from '../hooks/useAuth';

export default function SseNotifications(){
  const { events } = useSse();
  const { user } = useAuth();

  if (!user) return null;

  const unread = events.filter(ev => {
    if (user.role === 'HR' && ev.type === 'application') return true;
    if (user.role === 'JOB_SEEKER' && ev.type === 'job') return true;
    return false;
  }).length;

  return (
    <div className="relative">
      <button className="p-2 rounded-md hover:bg-gray-100">
        🔔
        {unread > 0 && <span className="inline-flex items-center justify-center ml-2 h-5 w-5 rounded-full bg-red-600 text-white text-xs">{unread}</span>}
      </button>
    </div>
  );
}
