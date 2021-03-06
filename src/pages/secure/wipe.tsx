import { useEffect, useState } from 'react';
import Loading from '@/components/Home/Loading';
import SecureLanding from '@/components/Secure/SecureLanding';
import HomePage from '@/components/Home/Home';
import PageHead from '@/components/PageHead';
import UploadStick from '@/components/UploadStick';
import DeleteAndClearPage from '@/components/Secure/DeleteAndClear/DeleteAndClearPage';
import fire from '@/utils/firebase';

export default function Wipe() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signed, setSigned] = useState(false);
  let one = false;

  useEffect(() => {
    const unregisterAuthObserver = fire.auth().onAuthStateChanged((user) => {
      if (!one && fire.auth().currentUser) {
        fire.auth().signOut();
        one = true;
      }
      setIsSignedIn(!!user);
      setSigned(true);
    });
    return () => unregisterAuthObserver();
  }, []);

  const returnElement = () => {
    if (!isSignedIn && !signed) {
      return <Loading />;
    }
    if (!isSignedIn) {
      return <SecureLanding />;
    }
    return <DeleteAndClearPage />;
  };

  return (
    <div className="h-full min-h-screen bg-white dark:bg-gray-800">
      <PageHead />
      {process.env.NEXT_PUBLIC_BASE_NAME === `HEROKU` ? (
        <UploadStick />
      ) : (
        returnElement()
      )}
    </div>
  );
}
