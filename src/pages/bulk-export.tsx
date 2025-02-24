import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { BulkExportView } from 'src/sections/bulkOps/export/view';

// ----------------------------------------------------------------------
export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Bulk Import - ${CONFIG.appName}`}</title>
      </Helmet>
      <BulkExportView />
    </>
  );
}
