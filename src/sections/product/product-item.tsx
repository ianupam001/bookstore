// product-item.tsx
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fCurrency } from 'src/utils/format-number';
import { Label } from 'src/components/label';
import { useRouter } from 'src/routes/hooks';
import { useNavigate } from 'react-router-dom';

export type ProductItemProps = {
  id: string;
  title: string;
  price: number;
  status: string;
  coverUrl: string;
  author?: string;
  currency?: string;
  format?: string;
  book: any;
};

export function ProductItem({ product }: { product: ProductItemProps }) {
  const navigate = useNavigate();
  const renderStatus = (
    <Label
      variant="inverted"
      color={product.status === 'Active' ? 'success' : 'error'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.title}
      src={product.coverUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );
  const handleClick = () => {
    navigate(`/books/${product.id}`, { state: { book: product.book } });
  };
  return (
    <Card onClick={handleClick} sx={{ cursor: 'pointer' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product.status && renderStatus}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.title}
        </Link>

        <Typography variant="body2" color="text.secondary">
          by {product.author || 'Unknown Author'}
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {product.format}
          </Typography>
          <Typography variant="subtitle1">
            {product.currency} {fCurrency(product.price)}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
