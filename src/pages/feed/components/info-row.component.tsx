import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Chip,
} from '@mui/material';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';

type InfoRowProps = {
  title?: string;
  content: string | string[];
  list?: boolean;
  tags?: boolean;
};

export default function InfoRow({
  title = '',
  content = [],
  list = false,
  tags = false,
}: InfoRowProps) {
  if (!content || content === null || content.length === 0) return <></>;

  if (
    list &&
    typeof content === 'string' &&
    content.split(/\r?\n/).length > 1
  ) {
    content = content.split(/\r?\n/);
  }
  return (
    <>
      <Divider variant="fullWidth" orientation="horizontal" sx={{ my: 1 }} />
      {title && (
        <Typography
          variant="subtitle2"
          color="initial"
          component="h6"
          sx={{
            opacity: 0.6,
          }}
        >
          {title}
        </Typography>
      )}

      {list && (
        <List dense>
          {content.map((item) => (
            <ListItem key={item}>
              <ListItemIcon>
                <WhatshotRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary={item}
                //   secondary={secondary ? 'Secondary text' : null}
              />
            </ListItem>
          ))}
        </List>
      )}
      {tags && (
        <Box>
          {content?.map((tag) => (
            <Chip
              key={tag}
              variant="filled"
              sizes="small"
              colors="default"
              label={tag}
              sx={{ my: 0.3, mx: 0.3 }}
            />
          ))}
        </Box>
      )}
      {!list && !tags && (
        <Typography
          variant="body1"
          color="initial"
          component="p"
          sx={{ lineHeight: 1.5, whiteSpace: 'pre-wrap' }}
        >
          {content}
        </Typography>
      )}
    </>
  );
}
