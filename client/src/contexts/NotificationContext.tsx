import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { toast } from 'sonner';

interface NotificationContextType {
  permission: NotificationPermission;
  isSupported: boolean;
  requestPermission: () => Promise<boolean>;
  sendNotification: (title: string, options?: NotificationOptions) => void;
  subscribedMatches: string[];
  subscribeToMatch: (matchId: string) => void;
  unsubscribeFromMatch: (matchId: string) => void;
  isSubscribed: (matchId: string) => boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const STORAGE_KEY = 'fantasy_subscribed_matches';

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const [subscribedMatches, setSubscribedMatches] = useState<string[]>([]);

  // Check if notifications are supported
  useEffect(() => {
    const supported = 'Notification' in window;
    setIsSupported(supported);
    
    if (supported) {
      setPermission(Notification.permission);
    }

    // Load subscribed matches from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSubscribedMatches(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse subscribed matches:', e);
      }
    }
  }, []);

  // Save subscribed matches to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribedMatches));
  }, [subscribedMatches]);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      toast.error('Notifications are not supported in this browser');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        toast.success('Notifications enabled! You\'ll be notified when matches go live.');
        return true;
      } else if (result === 'denied') {
        toast.error('Notifications blocked. Please enable them in your browser settings.');
        return false;
      }
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast.error('Failed to enable notifications');
      return false;
    }
  }, [isSupported]);

  const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (!isSupported || permission !== 'granted') {
      // Fallback to toast notification
      toast.info(title, {
        description: options?.body,
      });
      return;
    }

    try {
      const notification = new Notification(title, {
        icon: '/logo-icon.webp',
        badge: '/logo-icon.webp',
        ...options,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Auto-close after 10 seconds
      setTimeout(() => notification.close(), 10000);
    } catch (error) {
      console.error('Error sending notification:', error);
      // Fallback to toast
      toast.info(title, {
        description: options?.body,
      });
    }
  }, [isSupported, permission]);

  const subscribeToMatch = useCallback((matchId: string) => {
    setSubscribedMatches(prev => {
      if (prev.includes(matchId)) return prev;
      return [...prev, matchId];
    });
    toast.success('You\'ll be notified when this match goes live!');
  }, []);

  const unsubscribeFromMatch = useCallback((matchId: string) => {
    setSubscribedMatches(prev => prev.filter(id => id !== matchId));
    toast.info('Notifications disabled for this match');
  }, []);

  const isSubscribed = useCallback((matchId: string) => {
    return subscribedMatches.includes(matchId);
  }, [subscribedMatches]);

  return (
    <NotificationContext.Provider
      value={{
        permission,
        isSupported,
        requestPermission,
        sendNotification,
        subscribedMatches,
        subscribeToMatch,
        unsubscribeFromMatch,
        isSubscribed,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
