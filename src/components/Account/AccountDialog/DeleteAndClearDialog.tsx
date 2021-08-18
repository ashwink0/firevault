import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteAndClearDialog(props : {
  open: boolean;
  handleClose: Function;
}) {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete Account and Clear files
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This will clear all of your files on Firevault and delete your user
          account.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => props.handleClose()}
          variant="contained"
          color="primary"
        >
          No
        </Button>
        <Button className="m-3" variant="contained">
          Delete and Clear
        </Button>
      </DialogActions>
    </Dialog>
  );
}
