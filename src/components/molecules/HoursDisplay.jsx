import React from 'react';
import { format } from 'date-fns';
import Text from '@/components/atoms/Text';

const HoursDisplay = ({ hours }) => {
  const today = format(new Date(), 'EEEE').toLowerCase();
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentTime = currentHour * 60 + currentMinute;
  
  const todayHours = hours[today];
  
  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hour), parseInt(minute));
    return format(date, 'h:mm a');
  };
  
  const isOpen = () => {
    if (todayHours.closed) return false;
    
    const openTime = todayHours.open.split(':');
    const closeTime = todayHours.close.split(':');
    const openMinutes = parseInt(openTime[0]) * 60 + parseInt(openTime[1]);
    const closeMinutes = parseInt(closeTime[0]) * 60 + parseInt(closeTime[1]);
    
    return currentTime >= openMinutes && currentTime <= closeMinutes;
  };
  
  const isCurrentlyOpen = isOpen();
  
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${isCurrentlyOpen ? 'bg-success animate-pulse' : 'bg-error'}`} />
        <Text variant="body" color={isCurrentlyOpen ? 'default' : 'muted'} className="font-medium">
          {isCurrentlyOpen ? 'Open Now' : 'Closed'}
        </Text>
      </div>
      
      <div className="space-y-1">
        {Object.entries(hours).map(([day, schedule]) => (
          <div key={day} className={`flex justify-between text-sm ${
            day === today ? 'font-semibold text-primary' : 'text-gray-600'
          }`}>
            <span className="capitalize">{day}</span>
            <span>
              {schedule.closed 
                ? 'Closed' 
                : `${formatTime(schedule.open)} - ${formatTime(schedule.close)}`
              }
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoursDisplay;