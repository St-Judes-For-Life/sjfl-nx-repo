import Button from '@mui/material/Button';
import { useAidRequest, useSelectedStream } from '../hooks/useAidRequest';
import { UploadFileBtn } from '../../../../shared/components/buttons/UploadFileBtn';
import { Trans } from '@lingui/macro';

export const UploadAidDocs = () => {
  const aidRequest = useAidRequest();
  const selectedStream = useSelectedStream();

  const docs = selectedStream.documents;

  return (
    <div className="flex flex-col gap-8">
      <ul className="list-disc px-6">
        <li>
          <Trans id="UploadAidDocs.FileSize">File cannot exceed 5Mb</Trans>
        </li>
        <li>
          <Trans id="UploadAidDocs.Formats">
            Allowed formats - PDF, DOC, JPG, PNG
          </Trans>
        </li>
      </ul>
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
