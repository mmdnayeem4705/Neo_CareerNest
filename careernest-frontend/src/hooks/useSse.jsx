import { useEffect, useState, useRef } from 'react';

export default function useSse() {
  const [events, setEvents] = useState([]);
  const esRef = useRef(null);

  useEffect(() => {
    const base = process.env.REACT_APP_API_URL || '';
    const url = `${base}/api/stream`;
    const es = new EventSource(url);
    esRef.current = es;

    es.addEventListener('job-created', (e) => {
      try {
        const data = JSON.parse(e.data);
        setEvents(prev => [{type: 'job', data}, ...prev].slice(0, 20));
      } catch (err) { console.warn(err); }
    });

    es.addEventListener('application-created', (e) => {
      try {
        const data = JSON.parse(e.data);
        setEvents(prev => [{type: 'application', data}, ...prev].slice(0, 20));
      } catch (err) { console.warn(err); }
    });

    es.addEventListener('connected', () => {
      // noop
    });

    es.onerror = (err) => {
      console.warn('SSE error', err);
      es.close();
      // try reconnect after delay
      setTimeout(() => {
        if (esRef.current && esRef.current.readyState === EventSource.CLOSED) {
          esRef.current = new EventSource(url);
        }
      }, 3000);
    };

    return () => {
      es.close();
    };
  }, []);

  return { events };
}
