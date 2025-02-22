import { useState } from 'react';
import { DashboardContent } from 'src/layouts/dashboard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Iconify } from 'src/components/iconify';
import { toast } from 'sonner';
import { Banners } from 'src/api/banner';
import { BannerList } from '../banners';

// ----------------------------------------
export function BannerView() {
  const [openModal, setOpenModal] = useState(false);
  const [bannerData, setBannerData] = useState({
    name: '',
    bannerUrl: '',
    file: null as File | null,
    page: 'homePageBanners',
    isVerified: false,
    status: 'active',
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setBannerData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBannerData((prev) => ({ ...prev, bannerUrl: url, file }));
    }
  };

  const handleCreateBanner = async () => {
    console.log(bannerData);
    if (bannerData.file && bannerData.name && bannerData.page) {
      try {
        const status: 'active' | 'banned' = bannerData.status === 'banned' ? 'banned' : 'active';
        const response = await Banners.uploadBanner(
          bannerData.file,
          bannerData.name,
          bannerData.page,
          bannerData.isVerified || false,
          status
        );
        console.log('Banner Uploaded:', response);
        if (response.status === 201) {
          toast.success('Banner created successfully!');
          setBannerData({
            name: '',
            bannerUrl: '',
            file: null as File | null,
            page: 'homePageBanners',
            isVerified: false,
            status: 'active',
          });
          handleCloseModal();
        }
      } catch (error) {
        toast.error(error);
        console.error('Banner Upload Failed:', error);
      }
    } else {
      toast.warning('Please fill all required fields.');
      console.warn('Please fill all required fields.');
    }
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Home Page Banners
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpenModal}
        >
          New Banner
        </Button>
      </Box>

      <BannerList />

      {/* Modal for New Banner */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>Create New Banner</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <Button variant="outlined" component="label">
            Upload Banner
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>

          {bannerData.bannerUrl && (
            <Box
              component="img"
              src={bannerData.bannerUrl}
              alt="Banner Preview"
              sx={{ width: '100%', height: 150, borderRadius: 2, objectFit: 'cover', mt: 1 }}
            />
          )}

          <TextField
            label="Banner Name"
            name="name"
            value={bannerData.name}
            onChange={handleChange}
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox checked={bannerData.isVerified} onChange={handleChange} name="isVerified" />
            }
            label="Verified"
          />

          <FormControlLabel
            control={
              <Switch
                checked={bannerData.status === 'active'}
                onChange={(e) =>
                  setBannerData((prev) => ({
                    ...prev,
                    status: e.target.checked ? 'active' : 'banned',
                  }))
                }
              />
            }
            label={`Status: ${bannerData.status === 'active' ? 'Active' : 'Banned'}`}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateBanner}>
            Create Banner
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
