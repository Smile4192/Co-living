import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Box, Tooltip } from '@mui/material';

export default function CopyToClipboardWrapper({
  copyText,
  children,
}: {
  copyText: string;
  children: React.ReactElement;
}) {
  const [open, setOpen] = React.useState(false);
  const handleCopyClick = () => {
    setOpen(true);
    setTimeout(() => setOpen(false), 1500);
  };
  return (
    <Tooltip title="Copied to clipboard" open={open} onClick={handleCopyClick}>
      <Box sx={{ display: 'inline-flex' }}>
        <CopyToClipboard text={copyText} onCopy={handleCopyClick}>
          {children}
        </CopyToClipboard>
      </Box>
    </Tooltip>
  );
}
