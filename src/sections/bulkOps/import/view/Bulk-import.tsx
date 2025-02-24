import { useState, useCallback } from 'react';
import { Box, Button, Typography, Paper, LinearProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { toast } from 'sonner';
import { BulkOps } from 'src/api/bulk';

export function BulkImportView(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [uploadReady, setUploadReady] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
    setUploadReady(true);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) {
      toast.warning('Please select a file first.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await BulkOps.bulkImport(formData);
      if (response.data.success) {
        toast.success('File uploaded successfully');
      } else {
        toast.error('Error uploading file');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Bulk import from sheet
        </Typography>
      </Box>
      <Paper
        {...getRootProps()}
        sx={{
          p: 4,
          textAlign: 'center',
          border: '2px dashed #4a90e2',
          backgroundColor: isDragActive ? '#e3f2fd' : '#f9f9f9',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: isDragActive
            ? '0 4px 20px rgba(74, 144, 226, 0.2)'
            : '0 2px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <input {...getInputProps()} />
        <Iconify icon="material-symbols:cloud-upload" width={48} height={48} color="#4a90e2" />
        {isDragActive ? (
          <Typography variant="h6" mt={2}>
            Drop the file here...
          </Typography>
        ) : (
          <Typography variant="h6" mt={2}>
            {fileName || 'Drag & drop an XLSX file here, or click to select one'}
          </Typography>
        )}
        {uploadReady && (
          <Box mt={3}>
            <Typography variant="body1" color="success.main">
              {fileName} is ready to upload ✅
            </Typography>
            <LinearProgress variant="determinate" value={100} sx={{ mt: 2, borderRadius: '8px' }} />
          </Box>
        )}
      </Paper>
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          startIcon={<Iconify icon="material-symbols:upload" />}
          onClick={handleUpload}
          disabled={!file}
          sx={{
            backgroundColor: '#4a90e2',
            '&:hover': {
              backgroundColor: '#357ab7',
            },
            borderRadius: '12px',
            padding: '10px 20px',
          }}
        >
          Upload
        </Button>
      </Box>
    </DashboardContent>
  );
}
