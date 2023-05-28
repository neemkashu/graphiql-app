import { useDebounce } from '@/common/hook';
import { useAppSelector, playgroundDataSelector } from '@/redux';
import { DocumentData, DocumentReference, setDoc } from 'firebase/firestore';
import { MutableRefObject, useEffect, useState } from 'react';

export const DebouncedSaver = ({
  documentRef,
}: {
  documentRef: MutableRefObject<DocumentReference<DocumentData> | null>;
}): JSX.Element => {
  const userData = useAppSelector(playgroundDataSelector);
  const debouncedData = useDebounce(userData);
  const [, setIsDataSaving] = useState(false);
  const [, setError] = useState<unknown>();

  useEffect(() => {
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
