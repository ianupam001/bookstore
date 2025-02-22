import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { BannerView } from 'src/sections/promotions/ProductsPageBanners/view';

// --------------------------------------------------------
export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`Product Banner - ${CONFIG.appName}`}</title>
      </Helmet>
      <BannerView />
    </>
  );
}
