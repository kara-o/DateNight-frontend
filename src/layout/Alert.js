import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Disagree
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// const renderAlert = () => {
//   return (
//     <div className='cancel-button-div'>
//       {new Date(request.start_time) >= new Date() ? (
//         <Button variant='outlined' color='primary' onClick={handleClickOpen}>
//           Cancel
//         </Button>
//       ) : null}
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby='alert-dialog-title'
//         aria-describedby='alert-dialog-description'
//       >
//         <DialogContent>
//           <DialogContentText id='alert-dialog-description'>
//             Are you sure you want to cancel this request?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions className='modal-btns'>
//           <Button onClick={handleClose} color='primary'>
//             No way!
//           </Button>
//           <Button onClick={handleCancel} color='primary' autoFocus>
//             Yes, please cancel.
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };
