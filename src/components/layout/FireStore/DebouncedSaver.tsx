import { useDebounce } from '@/common/hook';
import { useAppSelector, playgroundDataSelector } from '@/redux';
import { DocumentData, DocumentReference, setDoc } from 'firebase/firestore';
import { useRef, useEffect, useState } from 'react';

export const DebouncedSaver = ({
  documentRef,
}: {
  documentRef: ReturnType<typeof useRef<DocumentReference<DocumentData> | null>>;
}): JSX.Element => {
  const userData = useAppSelector(playgroundDataSelector);
  const debouncedData = useDebounce(userData);
  const [, setIsDataSaving] = useState(false);
  const [, setError] = useState<unknown>();

  useEffect(() => {
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV === 'development') console.log('SAVE', { debouncedData });

    const currentDoc = documentRef.current;
    if (!currentDoc) return;

    const saveData = async (): Promise<void> => {
      setIsDataSaving(true);
      await setDoc(
        currentDoc,
        {
          playground: JSON.stringify(debouncedData),
        },
        { merge: true }
      )
        .catch((error) => setError(error))
        .finally(() => setIsDataSaving(false));
    };
    saveData();
  }, [debouncedData, documentRef]);

  return <></>;
};
