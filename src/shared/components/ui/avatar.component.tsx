import AvatarMUI from '@mui/material/Avatar';

export default function Avatar({ image, sx }: { image: string; sx?: object }) {
  return (
    <>
      <AvatarMUI alt="Profile" sx={{ height: 48, width: 48, ...sx }}>
        {image && (
          <img
            src={image}
            style={{ height: 48, width: 48 }}
            referrerPolicy="no-referrer"
          />
        )}
      </AvatarMUI>
    </>
  );
}
