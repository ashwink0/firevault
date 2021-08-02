import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useMemo, useState } from 'react';
import SignedInAppBar from '@/components/SignedInAppBar';
import ImageTile from '@/components/Home/Images/ImageTile';
import AccountImages from '@/components/Home/Images/AccountImages';
import Dropzone, { useDropzone } from 'react-dropzone';
import { RootRef, Paper } from '@material-ui/core';
import fire from '../../../utils/firebase';
import DropzoneArea from "@/components/Home/Images/Dropzone";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fire
      .auth()
      .currentUser?.getIdToken(false)
      .then((idToken) => {
        fetch(`/api/getAccountImages`, {
          method: `GET`,
          headers: {
            Authorization: idToken,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            setLoading(false);
            setData(json);
          });
      });
  });
  const classes = useStyles();
  const photoURL = fire.auth()?.currentUser?.photoURL;
  const name = fire.auth().currentUser!.displayName;

  return (
    <div>
      <SignedInAppBar />
      <div className="flex flex-col justify-center items-center pt-20">
        <main className="flex flex-col justify-center flex-1 items-center p-5">
          <p>Welcome {name}. You are now signed-in!</p>
          <DropzoneArea />
          <AccountImages loading={loading} data={data} />
        </main>
      </div>
    </div>
  );
}
