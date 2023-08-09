/* eslint-disable react/prop-types */
import FieldBuilder from '@/pages/questionnaire/components/field-builder.component';
import { setFilter } from '@/store/modules/feed/feed.slice';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, Button, Drawer, Paper } from '@mui/material';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const filterOptions = {
  // categories: [
  //   {
  //     label: 'Tech',
  //   },
  //   {
  //     label: 'Wellness',
  //   },
  //   {
  //     label: 'Arts',
  //   },
  //   {
  //     label: 'LGBTQIA+',
  //   },
  //   {
  //     label: 'POC',
  //   },
  //   {
  //     label: 'Women only',
  //   },
  //   {
  //     label: 'Mixed Interests',
  //   },
  // ],
  rent: [
    {
      label: 'Below $1000',
      value: { $lte: 1000 },
    },
    {
      label: 'Below $1250',
      value: { $lte: 1250 },
    },
    {
      label: 'Below $1500',
      value: { $lte: 1500 },
    },
  ],
  move_in_date: [
    {
      label: 'ASAP',
    },
    {
      label: monthNames[(new Date().getMonth() + 1) % 12],
    },
    {
      label: monthNames[(new Date().getMonth() + 2) % 12],
    },
    {
      label: monthNames[(new Date().getMonth() + 3) % 12],
    },
    {
      label: monthNames[(new Date().getMonth() + 4) % 12],
    },
  ],
  accommodation_type: [
    {
      label: 'Private room',
    },
    {
      label: 'Shared room',
    },
    {
      label: 'Pods',
    },
    {
      label: 'Private studio',
    },
    {
      label: 'Private house',
    },
    {
      label: 'Private apartment',
    },
    {
      label: 'Private bathroom',
    },
    {
      label: 'Private entrance',
    },
    {
      label: 'Furnished',
    },
    {
      label: 'Unfurnished',
    },
    {
      label: 'Ask if furnished',
    },
  ],
  roommate: [
    {
      label: 'Yes',
    },
    {
      label: 'No',
    },
  ],
  pet_policy: [
    {
      label: 'New pets are welcome',
    },
    {
      label: 'Has pets, but does not accept more',
    },
    {
      label: 'No pets allowed',
    },
  ],
  parking: [
    {
      label: 'Street parking is ok',
    },
    {
      label: 'On-premise parking needed',
    },
  ],
  number_residents: [
    {
      label: 'Less than 5',
      value: { $lte: 5 },
    },
    {
      label: 'More than 5',
      value: { $gte: 5 },
    },
    {
      label: 'Less than 10',
      value: { $lte: 10 },
    },
    {
      label: 'More than 10',
      value: { $gte: 10 },
    },
  ],
  social_vibes: [
    {
      label: 'Easygoing',
    },
    {
      label: 'Hanging out together',
    },
    {
      label: 'Board games',
    },
    {
      label: 'Emotional support',
    },
    {
      label: 'Love and admiration',
    },
    {
      label: 'Community events',
    },
    {
      label: 'Movies',
    },
    {
      label: 'Music',
    },
    {
      label: 'Video games',
    },

    {
      label: 'Food',
    },

    {
      label: 'Vegetarian',
    },

    {
      label: 'Vegan',
    },

    {
      label: 'Barbecue',
    },
    {
      label: 'Coffee/tea together',
    },
    {
      label: 'Meals together',
    },
    {
      label: 'Cooking together',
    },
  ],
  identity: [
    {
      label: 'LGBTQIA+',
    },
    {
      label: 'Queer',
    },
    {
      label: 'Gay',
    },
    {
      label: 'QTPOC',
    },
    {
      label: 'BIPOC',
    },
  ],
  gender_preferences: [
    {
      label: 'Women only',
    },
    {
      label: 'Gender balance',
    },
    {
      label: 'Creativity',
    },

    {
      label: 'Artists',
    },

    {
      label: 'Creatives',
    },

    {
      label: 'Musicians',
    },

    {
      label: 'Designers',
    },

    {
      label: 'Painting',
    },
  ],
  occupation_types: [
    {
      label: 'Students',
    },
    {
      label: 'Coaches/Practitioners',
    },
    {
      label: 'Freelancers',
    },
    {
      label: 'Entrepreneurs',
    },
    {
      label: 'Founders',
    },
    {
      label: 'Thinkers/Inventors',
    },
    {
      label: 'Do-ers/Builders',
    },
    {
      label: 'Scientists/Professors',
    },
    {
      label: 'Professionals/Specialists',
    },
  ],
  occupational_areas: [
    {
      label: 'Tech/Engineering',
    },
    {
      label: 'Robotics',
    },
    {
      label: 'Energy',
    },
    {
      label: 'Healthcare',
    },
    {
      label: 'Biotech',
    },
    {
      label: 'Privacy',
    },
    {
      label: 'Web3/AI',
    },
    {
      label: 'Law',
    },
    {
      label: 'Environment',
    },
    {
      label: 'Media',
    },
  ],
  outdoor_activities: [
    {
      label: 'Camping',
    },
    {
      label: 'Hiking',
    },
    {
      label: 'Picnics',
    },
    {
      label: 'Dancing',
    },
    {
      label: 'Go to Bars/Clubs',
    },
    {
      label: 'Motorsport',
    },
    {
      label: 'Adventures/Group tours',
    },
  ],
  sports: [
    {
      label: 'Running',
    },
    {
      label: 'Cycling',
    },
    {
      label: 'Climbing',
    },
    {
      label: 'Surfing',
    },
    {
      label: 'Yoga',
    },
    {
      label: 'Skating',
    },
    {
      label: 'Swimming',
    },
    {
      label: 'Beach volleyball',
    },
    {
      label: 'Soccer',
    },
    {
      label: 'Golf',
    },
  ],
  passions: [
    {
      label: 'Gardening/Plants',
    },
    {
      label: 'Personal development',
    },
    {
      label: 'Reading',
    },
    {
      label: 'Writing',
    },
    {
      label: 'Historic',
    },
    {
      label: 'Meditation/Mindfulness',
    },
    {
      label: 'Spiritual practices',
    },
    {
      label: 'Nonprofit projects',
    },
    {
      label: 'Collaborative cultures',
    },
    {
      label: 'Community leaders',
    },
    {
      label: 'Sex positive',
    },
    {
      label: 'Startups',
    },
    {
      label: 'Commonwealth',
    },
    {
      label: 'Poker',
    },
    {
      label: 'Kink',
    },
  ],
  city: [
    {
      label: 'San Francisco',
    },
    {
      label: 'Oakland',
    },
    {
      label: 'Berkeley',
    },
    {
      label: 'Daly City',
    },
    {
      label: 'Alameda',
    },
    {
      label: 'East Bay',
    },
    {
      label: 'South Bay',
    },
    {
      label: 'Peninsula',
    },
    {
      label: 'North Bay',
    },
  ],
  lease_period: [
    {
      label: '1-3 months',
      value: false,
    },
    {
      label: '4-7 months',
      value: false,
    },
    {
      label: '8-12 months',
      value: false,
    },
  ],
};

export default function Filter({ sidebar = false }: { sidebar?: boolean }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();
  const filter = useSelector((state) => state.feed.filter);
  const initialFilter = {
    main: filter.main || '',
    rent: filter.rent || '',
    monthly_budget: filter.monthly_budget || '', //for resident
    move_in_date: filter.move_in_date || '',
    city: filter.city || [],
    preferred_location: filter.preferred_location || [], //for resident
    lease_period: filter.lease_period || [],
    accommodation_type: filter.accommodation_type || [],
    roommate: filter.roommate || '',
    pet_policy: filter.pet_policy || '',
    parking: filter.parking || '',
    number_residents: filter.number_residents || '',
    social_vibes: filter.social_vibes || [],
    identity: filter.identity || [],
    gender_preferences: filter.gender_preferences || [],
    occupation_types: filter.occupation_types || [],
    occupational_areas: filter.occupational_areas || [],
    outdoor_activities: filter.outdoor_activities || [],
    sports: filter.sports || [],
    passions: filter.passions || [],
  };
  // const filter = useSelector((state) => state.feed.filter);
  const [preFilter, setPreFilter] = useState(initialFilter);
  const [toggleChip, setToggleChip] = useState({
    compatible: true,
    trendy: false,
    new: false,
    immediate_move_in: false,
  });
  const handleToggle = (name) => {
    setToggleChip({
      ...{
        compatible: false,
        trendy: false,
        new: false,
        immediate_move_in: false,
      },
      [name]: true,
    });
    setPreFilter((prev) => ({
      ...prev,
      main: name,
    }));
  };

  const handleChange = ({ value, name }) => {
    setPreFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const acceptFilter = () => {
    const cleanReqFilter = { ...preFilter };
    for (const key in cleanReqFilter) {
      if (cleanReqFilter[key as keyof typeof cleanReqFilter].length === 0) {
        delete cleanReqFilter[key as keyof typeof cleanReqFilter];
      }
      if (Array.isArray(cleanReqFilter[key as keyof typeof cleanReqFilter])) {
        cleanReqFilter[key] = {
          $in: cleanReqFilter[key as keyof typeof cleanReqFilter],
        };
      }
    }
    dispatch(setFilter({ filter: cleanReqFilter }));
    toggleDrawer();
  };
  if (!sidebar)
    return (
      <>
        <Paper
          square
          sx={{
            display: { xs: 'flex', sm: 'none' },
            // display: 'flex',
            position: { xs: 'fixed', sm: 'sticky' },
            top: 0,
            left: 0,
            zIndex: 10,
            py: 0.6,
            pl: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 0.5,
            width: '100%',
            bgcolor: '#fff',
            // maxWidth: 911,
          }}
        >
          <Chip
            size="small"
            label="Compatible"
            color={toggleChip.compatible ? 'primary' : 'default'}
            onClick={() => handleToggle('compatible')}
          />

          {/* <Chip
          size="small"
          label="Trendy"
          color={toggleChip.trendy ? 'primary' : 'default'}
          onClick={() => handleToggle('trendy')}
        />

        <Chip
          size="small"
          label="New"
          color={toggleChip.new ? 'primary' : 'default'}
          onClick={() => handleToggle('new')}
        />

        <Chip
          size="small"
          label="Immediate move-in"
          color={toggleChip.immediate_move_in ? 'primary' : 'default'}
          onClick={() => handleToggle('immediate_move_in')}
        /> */}

          <IconButton
            aria-label="toggleFilter"
            onClick={() => toggleDrawer()}
            sx={{
              ml: 'auto',
            }}
          >
            <TuneIcon fontSize="small" />
          </IconButton>
          <Drawer
            open={open}
            anchor="right"
            onClose={() => toggleDrawer()}
            PaperProps={{
              sx: {
                maxWidth: { xs: '65%', sm: '45%', lg: '35%' },
                pl: 2.5,
                pt: 2.5,
              },
            }}
          >
            <FilterInner filter={preFilter} handleChange={handleChange} />
            <Paper
              square
              sx={{
                px: 0,
                py: 2,
                bgcolor: '#fff',
                position: 'sticky',
                bottom: 0,
                ml: -2.5,
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  acceptFilter();
                  console.log(preFilter);
                }}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setPreFilter(initialFilter)}
              >
                Reset
              </Button>
            </Paper>
          </Drawer>
          {/* <Chip size="small" label={} /> */}
        </Paper>
      </>
    );

  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      {/* 
      <FilterInner filter={preFilter} handleChange={handleChange} />
      <Stack spacing={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            acceptFilter();
            console.log(preFilter);
          }}
        >
          Accept
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => setPreFilter(initialFilter)}
        >
          Reset
        </Button>
      </Stack> */}

      <Button
        aria-label="toggleFilter"
        onClick={() => toggleDrawer()}
        variant="text"
        color="inherit"
        startIcon={<TuneIcon fontSize="small" />}
      >
        Filters
      </Button>
      <Drawer
        open={open}
        anchor="right"
        onClose={() => toggleDrawer()}
        PaperProps={{
          sx: {
            maxWidth: { xs: '65%', sm: '45%', lg: '35%' },
            pl: 2.5,
            pt: 2.5,
          },
        }}
      >
        <FilterInner filter={preFilter} handleChange={handleChange} />
        <Paper
          square
          sx={{
            px: 0,
            py: 2,
            bgcolor: '#fff',
            position: 'sticky',
            bottom: 0,
            ml: -2.5,
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              acceptFilter();
              console.log(preFilter);
            }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => setPreFilter(initialFilter)}
          >
            Reset
          </Button>
        </Paper>
      </Drawer>
    </Box>
  );
}

const FilterInner = ({ filter, handleChange }) => {
  const type = useSelector((state) => state.feed.type);
  return (
    <>
      <FieldBuilder
        title="Price range"
        type="radiolist"
        name={type === 'residents' ? 'monthly_budget' : 'rent'}
        value={type === 'residents' ? filter.monthly_budget : filter.rent}
        onChange={handleChange}
        options={filterOptions.rent}
        dense={false}
      />
      <FieldBuilder
        title="Preferred location"
        type="checklist"
        name={type === 'residents' ? 'preferred_location' : 'city'}
        value={type === 'residents' ? filter.preferred_location : filter.city}
        onChange={handleChange}
        options={filterOptions.city}
        dense={false}
      />
      <FieldBuilder
        title="Lease period"
        name="lease_period"
        type="checklist"
        value={filter.lease_period}
        onChange={handleChange}
        options={filterOptions.lease_period}
        dense={false}
      />
      <FieldBuilder
        title="Pet policy"
        type="radiolist"
        name="pet_policy"
        value={filter.pet_policy}
        onChange={handleChange}
        options={filterOptions.pet_policy}
        dense={false}
      />
      <FieldBuilder
        title="Number of residents"
        name="number_residents"
        type="radiolist"
        value={filter.number_residents}
        onChange={handleChange}
        options={filterOptions.number_residents}
        min={2}
        max={10}
        dense={false}
      />
    </>
  );
};
