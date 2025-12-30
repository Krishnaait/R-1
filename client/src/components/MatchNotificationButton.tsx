import { Bell, BellOff, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/contexts/NotificationContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MatchNotificationButtonProps {
  matchId: string;
  matchName?: string;
  size?: 'sm' | 'default' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'ghost';
}

export default function MatchNotificationButton({
  matchId,
  matchName,
  size = 'icon',
  variant = 'ghost',
}: MatchNotificationButtonProps) {
  const {
    permission,
    isSupported,
    requestPermission,
    subscribeToMatch,
    unsubscribeFromMatch,
    isSubscribed,
  } = useNotifications();

  if (!isSupported) {
    return null;
  }

  const subscribed = isSubscribed(matchId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return;
    }

    if (subscribed) {
      unsubscribeFromMatch(matchId);
    } else {
      subscribeToMatch(matchId);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size={size}
          onClick={handleClick}
          className={subscribed ? 'text-primary' : 'text-muted-foreground hover:text-primary'}
        >
          {subscribed ? (
            <BellRing className="h-4 w-4" />
          ) : (
            <Bell className="h-4 w-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {subscribed ? 'Notifications enabled - Click to disable' : 'Get notified when match goes live'}
      </TooltipContent>
    </Tooltip>
  );
}
