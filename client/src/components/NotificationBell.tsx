import { Bell, BellOff, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useNotifications } from '@/contexts/NotificationContext';
import { Badge } from '@/components/ui/badge';

export default function NotificationBell() {
  const { 
    permission, 
    isSupported, 
    requestPermission, 
    subscribedMatches 
  } = useNotifications();

  if (!isSupported) {
    return null;
  }

  const handleEnableNotifications = async () => {
    await requestPermission();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {permission === 'granted' ? (
            <>
              <Bell className="h-5 w-5" />
              {subscribedMatches.length > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  variant="default"
                >
                  {subscribedMatches.length}
                </Badge>
              )}
            </>
          ) : permission === 'denied' ? (
            <BellOff className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Bell className="h-5 w-5 text-muted-foreground" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BellRing className="h-5 w-5 text-primary" />
            <h4 className="font-semibold">Match Notifications</h4>
          </div>

          {permission === 'granted' ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Notifications are enabled! You'll be alerted when:
              </p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Your subscribed matches go live
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Your team's points update
                </li>
              </ul>
              {subscribedMatches.length > 0 ? (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Watching {subscribedMatches.length} match{subscribedMatches.length > 1 ? 'es' : ''}
                  </p>
                </div>
              ) : (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Subscribe to matches from the Matches page to get alerts
                  </p>
                </div>
              )}
            </div>
          ) : permission === 'denied' ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Notifications are blocked. To enable them:
              </p>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Click the lock icon in your browser's address bar</li>
                <li>Find "Notifications" in the permissions</li>
                <li>Change it to "Allow"</li>
                <li>Refresh the page</li>
              </ol>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Enable notifications to get alerts when your matches go live and your team scores points!
              </p>
              <Button 
                onClick={handleEnableNotifications} 
                className="w-full gradient-brand"
              >
                <Bell className="h-4 w-4 mr-2" />
                Enable Notifications
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
