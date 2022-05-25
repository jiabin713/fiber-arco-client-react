import 'virtual:windi.css';
import '@/assets/styles/global.less';

import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root'),
);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   // <React.StrictMode>
//   <BrowserRouter>
//     <QueryClientProvider client={queryClient}>
//       <RecoilRoot>
//         <App />
//       </RecoilRoot>
//     </QueryClientProvider>
//   </BrowserRouter>,
//   // </React.StrictMode>,
// );
