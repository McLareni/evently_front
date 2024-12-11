import { Controller, useForm } from 'react-hook-form';

import { GoogleMapsInput } from './GoogleMapsInput';

type Address = {
  address: {
    formatted: string;
    lat: number;
    lng: number;
    name: string;
    city: string;
  };
};

export const GoogleForm = () => {
  const { handleSubmit, control, setValue } = useForm<Address>({
    mode: 'onChange',
  });

  const onSubmit = (data: Address) => {
    console.log(data.address);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="address"
        control={control}
        defaultValue={{
          formatted: '',
          lat: 0,
          lng: 0,
          name: '',
          city: 'Київ',
        }}
        render={({ field }) => (
          <GoogleMapsInput
            onPlaceSelect={place => {
              if (!place || !place.geometry) return;

              const formattedPlace = {
                formatted: place.formatted_address || '',
                lat: place.geometry.location?.lat() || 0,
                lng: place.geometry.location?.lng() || 0,
                name: place.name || '',
                city: 'Київ',
              };

              setValue('address', formattedPlace);
              field.onChange(formattedPlace);
            }}
          />
        )}
      />

      <button type="submit">OK</button>
    </form>
  );
};
