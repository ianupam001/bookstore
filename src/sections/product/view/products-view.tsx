// products-view.tsx
import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { BooksStats } from 'src/api/booksStats';
import { DashboardContent } from 'src/layouts/dashboard';
import { ProductItem } from '../product-item';
import { ProductSort } from '../product-sort';
import { CartIcon } from '../product-cart-widget';
import { ProductFilters } from '../product-filters';
import type { FiltersProps } from '../product-filters';

// ----------------------------------------------------------------------

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'Self-Help', label: 'Self-Help' },
  { value: 'Fiction', label: 'Fiction' },
  { value: 'Non-Fiction', label: 'Non-Fiction' },
];

const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRICE_OPTIONS = [
  { value: 'below', label: 'Below $5' },
  { value: 'between', label: 'Between $5 - $15' },
  { value: 'above', label: 'Above $15' },
];

const defaultFilters = {
  price: '',
  category: CATEGORY_OPTIONS[0].value,
  rating: RATING_OPTIONS[0],
};

export function ProductsView() {
  const [sortBy, setSortBy] = useState('featured');
  const [books, setBooks] = useState<any[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const canReset = Object.keys(filters).some(
    (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
  );

  const fetchBooks = async () => {
    try {
      const response = await BooksStats.getAllBooks();
      if (response?.data) {
        setBooks(response.data);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Books
      </Typography>

      <CartIcon totalItems={8} />

      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Box gap={1} display="flex" flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            canReset={canReset}
            filters={filters}
            onSetFilters={handleSetFilters}
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            onResetFilter={() => setFilters(defaultFilters)}
            options={{
              categories: CATEGORY_OPTIONS,
              ratings: RATING_OPTIONS,
              price: PRICE_OPTIONS,
            }}
          />

          <ProductSort
            sortBy={sortBy}
            onSort={handleSort}
            options={[
              { value: 'featured', label: 'Featured' },
              { value: 'newest', label: 'Newest' },
              { value: 'priceDesc', label: 'Price: High-Low' },
              { value: 'priceAsc', label: 'Price: Low-High' },
            ]}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid key={book._id} xs={12} sm={6} md={3}>
            <ProductItem
              product={{
                id: book._id,
                title: book.title,
                price: book.sellingPrice,
                status: book.status,
                coverUrl: book.imageLinks?.[0] || '/placeholder.jpg',
                author: book.authors?.[0],
                currency: book.currencyName,
                format: book.format,
                book,
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  );
}
