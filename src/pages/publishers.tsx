import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { PublishersView } from 'src/sections/publishers/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Publishers - ${CONFIG.appName}`}</title>
      </Helmet>

      <PublishersView />
    </>
  );
}
