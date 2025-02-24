import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { BulkImportView } from 'src/sections/bulkOps/import/view';

// ----------------------------------------------------------------------
export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Bulk Import - ${CONFIG.appName}`}</title>
      </Helmet>
      <BulkImportView />
    </>
  );
}
