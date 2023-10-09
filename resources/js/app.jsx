// app.jsx
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { pdfjs } from 'react-pdf'; // Import pdfjs
import { ContextProvider } from './contents/ContextProvider';

createInertiaApp({
    resolve: (name) => {
      const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ el, App, props }) => {
      // Configure pdfjs worker here
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url
      ).toString();

      // Render the app wrapped inside the ContextProvider
      createRoot(el).render(
        <ContextProvider>
          <App {...props} />
        </ContextProvider>
      );
    },
  });
