import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { AuthorsView } from 'src/sections/authors/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Authors - ${CONFIG.appName}`}</title>
      </Helmet>

      <AuthorsView />
    </>
  );
}
