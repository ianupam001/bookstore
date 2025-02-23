import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TablePagination,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { BooksStats } from 'src/api/booksStats';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AuthorData {
  author: string[];
  books: string[];
  count: number;
}

export function AuthorsView() {
  const [authors, setAuthors] = useState<AuthorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const fetchAuthors = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await BooksStats.getAuthors();
      setAuthors(response.data.data);
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (): void => {
    const csvHeader = 'Author,Total Books,Books List\n';
    const csvRows = authors.map((author) => {
      const booksList = author.books.join('; ');
      const authorNames = author.author.join(', ');
      return `"${authorNames}",${author.count},"${booksList}"`;
    });
    const csvContent = csvHeader + csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'authors_list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenModal = (books: string[]) => {
    setSelectedBooks(books);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  if (loading) {
    return (
      <DashboardContent>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Authors Overview
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="line-md:cloud-alt-upload-loop" />}
          onClick={handleExport}
        >
          Export List
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>SL No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Authors</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Books</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total Number of Books</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((authorData, index) => (
                <TableRow key={index}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    {authorData.author.map((name, idx) => (
                      <Typography key={idx} variant="body2">
                        {name}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>
                    {authorData.books.slice(0, 3).map((book, bookIndex) => (
                      <Typography key={bookIndex} variant="body2">
                        • {book}
                      </Typography>
                    ))}
                    {authorData.books.length > 3 && (
                      <IconButton onClick={() => handleOpenModal(authorData.books)}>
                        <ExpandMoreIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>{authorData.count}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={authors.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>

      {/* Modal for full book list */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Full Book List</DialogTitle>
        <DialogContent>
          {selectedBooks.map((book, index) => (
            <Typography key={index} variant="body2" gutterBottom>
              {index + 1}. {book}
            </Typography>
          ))}
        </DialogContent>
      </Dialog>
    </DashboardContent>
  );
}
