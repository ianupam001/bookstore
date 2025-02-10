import { Proportions, Image, FileText, Link2, Book, BookOpen, BookMarked, BookCheck, CloudUpload, Import, ArrowUpToLine, CircleFadingArrowUp, Trash2, Shuffle, Split } from 'lucide-react';
import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';
import { NavContentProps } from './dashboard/nav';

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Promotions',
    path: '#',
    icon: <Proportions size={22} />,
    children: [
      {
        title: 'Home Page Banners',
        path: '/promotions/home-banners',
        icon: <Image size={18} />,
      },
      {
        title: 'Product Page Banners',
        path: '/promotions/product-banners',
        icon: <FileText size={18} />,
      },
      {
        title: 'Affiliate Text Links',
        path: '/promotions/affiliate-links',
        icon: <Link2 size={18} />,
      },
    ],
  },
  {
    title: 'Books',
    path: '/books',
    icon: <BookOpen size={22} />,
    info: (
      <Label color="error" variant="inverted">
        +90
      </Label>
    ),
  },
  {
    title: 'Authors',
    path: '/authors',
    icon: <BookMarked size={22} />,
  },
  {
    title: 'Publishers',
    path: '/publishers',
    icon: <BookCheck size={22} />,
  },
  {
    title: 'Bulk Import/Export',
    path: '#',
    icon: <CloudUpload size={22}/>,
    children:[
      {
        title:"Bulk Import",
        path:"/bulk-import",
        icon:<Import size={18}/>
      },
      {
        title:"Bulk Export",
        path:"/bulk-export",
        icon:<ArrowUpToLine size={18}/>
      },
      {
        title:"Bulk Update",
        path:"/bulk-update",
        icon:<CircleFadingArrowUp size={18}/>
      },
      {
        title:"Bulk Delete",
        path:"/bulk-delete",
        icon:<Trash2 size={18}/>
      },
      {
        title:"Custom Update",
        path:"/custom-update",
        icon:<Shuffle size={18}/>
      },
      {
        title:"Export ISBNs Only",
        path:"/export-isbn",
        icon:<Split size={18}/>
      },
    ]
  },
  {
    title: 'User',
    path: '/user',
    icon: icon('ic-user'),
  },

  {
    title: 'Blog',
    path: '/blog',
    icon: icon('ic-blog'),
  },
];
