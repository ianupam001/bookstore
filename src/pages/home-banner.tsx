import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { BannerView } from 'src/sections/promotions/HomePageBanners/view';

// --------------------------------------------------------
export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`Home Banner - ${CONFIG.appName}`}</title>
      </Helmet>
      <BannerView />
    </>
  );
}
