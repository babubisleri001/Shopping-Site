import { useEffect } from 'react';
import './Waitlist.scss';

const Waitlist = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return <div id="getWaitlistContainer" data-waitlist_id="18113" data-widget_type="WIDGET_1"></div>;
};

export default Waitlist;
