import LanguageIcon from '@mui/icons-material/Language';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useContext, useState } from 'react';
import { LanguageSelectionPage } from '../../../features/Common/LanguageSelectionPage';
import { SlideUp } from '../../helpers/transitions/DialogTransitions';
import { LocaleContext } from '../../store/context/LocaleContext';

export const LanguageButton = () => {
  const { locale } = useContext(LocaleContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<LanguageIcon />}
        className="!border-1 !rounded-full !capitalize"
        onClick={() => setIsOpen(true)}
      >
        {locale?.name}
      </Button>
      <Dialog
        open={isOpen}
        fullScreen
        onClose={() => setIsOpen(false)}
        TransitionComponent={SlideUp}
      >
        <LanguageSelectionPage
          canDismiss
          onDismiss={() => setIsOpen(false)}
        ></LanguageSelectionPage>
      </Dialog>
    </>
  );
};
