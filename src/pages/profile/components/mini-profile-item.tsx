import React from 'react';
import CopyToClipboardWrapper from '@/shared/components/ui/copy-to-clipboard-wrapper';
import { Box, Button, ButtonBase, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'mui-image';

interface MiniProfileItemProps {
  item: {
    title: string;
    image: string;
  };
  onClick: () => void;
}

export default function MiniProfileItem({
  item,
  onClick,
}: MiniProfileItemProps) {
  function copyToClipboardText(params: string) {
    return `${window.location.origin}/review?${new URLSearchParams(
      params,
    ).toString()}`;
  }

  return (
    <Paper
      variant="elevation"
      sx={{ width: '100%', height: 80, borderRadius: 4, overflow: 'hidden' }}
    >
      <Stack
        spacing={1}
        alignItems="stretch"
        direction={'row'}
        sx={{ height: '100%' }}
      >
        <ButtonBase
          onClick={onClick}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: '100%',
            height: '100%',
          }}
        >
          <Box sx={{ height: '100%', aspectRatio: 1 }}>
            <Image
              style={{ borderRadius: '4px' }}
              src={item.image ? item.image : ''}
              duration={1}
            />
          </Box>
          <Typography
            variant="subtitle2"
            color="initial"
            ml={1}
            textAlign={'left'}
            height={'100%'}
          >
            {item.title}
          </Typography>
        </ButtonBase>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: 0.5,
            height: '100%',
          }}
        >
          <CopyToClipboardWrapper
            copyText={`${window.location.origin}/${item.id}`}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                lineHeight: 1,
                p: 1,
                width: '100%',
                color: '#fff',
                bgcolor: '#32678F',
                '&:hover': {
                  bgcolor: '#1d3e57',
                },
              }}
            >
              Public page
            </Button>
          </CopyToClipboardWrapper>
          <CopyToClipboardWrapper
            copyText={copyToClipboardText({ title: item.title })}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                lineHeight: 1,
                p: 0.5,
              }}
            >
              Request a reference
            </Button>
          </CopyToClipboardWrapper>
        </Box>
      </Stack>
    </Paper>
  );
}
