
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CalendarConnected() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: 'Success!',
      description: 'Your Google Calendar has been connected successfully.',
    });
    
    // Redirect to dashboard after a short delay
    const timeout = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate, toast]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Calendar Connected!</h1>
        <p className="text-gray-600 mb-4">
          Your Google Calendar has been successfully connected. You will be redirected shortly...
        </p>
      </div>
    </div>
  );
}
