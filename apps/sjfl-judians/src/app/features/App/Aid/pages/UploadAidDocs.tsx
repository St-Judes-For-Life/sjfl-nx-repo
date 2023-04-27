import Button from '@mui/material/Button';
import { useAidRequest, useSelectedStream } from '../hooks/useAidRequest';
import { UploadFileBtn } from '../../../../shared/components/buttons/UploadFileBtn';

export const UploadAidDocs = () => {
  const aidRequest = useAidRequest();
  const selectedStream = useSelectedStream();

  const docs = selectedStream.documents;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 items-center">
        {docs.map((doc) => (
          <UploadFileBtn
            key={doc.id}
            docId={doc.id}
            label={doc.documentName}
            fileType="image+file"
            onPick={(files) =>
              aidRequest.addFile(files, doc.documentName, doc.id)
            }
          />
        ))}
      </div>
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          aidRequest.nextStep({
            ...aidRequest.request,
          });
        }}
      >
        NEXT
      </Button>
    </div>
  );
};
