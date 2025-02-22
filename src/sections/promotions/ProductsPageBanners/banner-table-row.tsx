import { useState, useCallback } from 'react';
import {
  Box,
  Popover,
  TableRow,
  Checkbox,
  MenuList,
  TableCell,
  IconButton,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { toast } from 'sonner';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Banners } from 'src/api/banner';

export type BannerProps = {
  _id: string;
  name: string;
  status: string;
  bannerUrl: string;
  isVerified: boolean;
};

type BannerTableRowProps = {
  row: BannerProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function BannerTableRow({ row, selected, onSelectRow }: BannerTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [updatedName, setUpdatedName] = useState(row.name);
  const [updatedStatus, setUpdatedStatus] = useState(row.status);
  const [updatedIsVerified, setUpdatedIsVerified] = useState(row.isVerified);
  const [updatedBanner, setUpdatedBanner] = useState<File | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string>(row.bannerUrl);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDelete = async () => {
    try {
      await Banners.deleteBanner(row._id);
      setOpenDialog(false);
      handleClosePopover();
      toast.success('Banner deleted successfully!');
    } catch (error) {
      console.error('Failed to delete banner:', error);
      toast.error('Failed to delete banner. Please try again.');
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = new FormData();
      updatedData.append('name', updatedName);
      updatedData.append('status', updatedStatus);
      updatedData.append('isVerified', String(updatedIsVerified));

      if (updatedBanner) {
        updatedData.append('banner', updatedBanner);
      }

      await Banners.updateBanner(row._id, updatedData as any);

      setOpenEditModal(false);
      toast.success('Banner updated successfully!');
    } catch (error) {
      console.error('Failed to update banner:', error);
      toast.error('Failed to update banner. Please try again.');
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUpdatedBanner(file);
      setPreviewBanner(URL.createObjectURL(file)); // Image preview
    }
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Box
              component="img"
              src={row.bannerUrl}
              alt={row.name}
              sx={{
                width: 120,
                height: 60,
                borderRadius: 1,
                objectFit: 'cover',
              }}
            />
            {row.name}
          </Box>
        </TableCell>

        <TableCell align="center">
          {row.isVerified ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Popover for actions */}
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              setOpenEditModal(true);
              handleClosePopover();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={() => setOpenDialog(true)} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure you want to delete this banner?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Banner Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Banner</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="Banner Name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                native
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="banned">Banned</option>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={updatedIsVerified}
                  onChange={(e) => setUpdatedIsVerified(e.target.checked)}
                />
              }
              label="Verified"
            />
            <Box>
              <label htmlFor="banner-upload">
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleBannerUpload}
                />
                <Button variant="contained" component="span">
                  Upload New Banner
                </Button>
              </label>
              {previewBanner && (
                <Box
                  component="img"
                  src={previewBanner}
                  alt="Preview"
                  sx={{
                    mt: 2,
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 2,
                    border: '1px solid #ccc',
                  }}
                />
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
