import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

import { GoogleMapsInput } from './GoogleMapsInput';

interface OnlineOfflineProps {
  control: Control<CreateEventFormValues>;
  setValue: UseFormSetValue<CreateEventFormValues>;
  watch: UseFormWatch<CreateEventFormValues>;
  errors: FieldErrors<CreateEventFormValues>;
  trigger: UseFormTrigger<CreateEventFormValues>;
}

export const OnlineOffline = ({
  control,
  setValue,
  watch,
  errors,
  trigger,
}: OnlineOfflineProps) => {
  const isOffline = watch('isOffline');

  const setOffline = () => {
    setValue('isOffline', true);
    setValue('eventUrl', '');
    trigger('location');
  };

  const setOnline = () => {
    setValue('isOffline', false);
    setValue('location', {
      city: '',
      street: '',
      venue: '',
      latitude: '',
      longitude: '',
    });
    trigger('eventUrl');
  };

  return (
    <>
      <span className="pb-4 text-2xl">
        Формат події<span className="star">*</span>
      </span>
      <div className="pb-6">
        <button
          type="button"
          className={`${
            isOffline
              ? 'bg-buttonPurple text-white'
              : 'bg-lightPurple text-gray-700'
          } focus:outline-none font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
          onClick={setOffline}
        >
          Оффлайн
        </button>

        <button
          type="button"
          className={`${
            isOffline
              ? 'bg-lightPurple text-gray-700'
              : 'bg-buttonPurple text-white'
          } focus:outline-none font-normal text-xl rounded-[20px] mr-4 py-[12.5px] px-[18px]`}
          onClick={setOnline}
        >
          Онлайн
        </button>
      </div>

      {isOffline ? (
        <div className="flex flex-col w-full">
          <label htmlFor="location" className="pb-3">
            Адреса
          </label>
          <div className="w-full h-[52px] p-[2px] bg-createEventInputBorder rounded-[10px]">
            <Controller
              name="location"
              control={control}
              rules={{
                required: "Адреса обов'язкова",
                validate: {
                  isValid: value => {
                    if (isOffline) {
                      if (
                        value.city.length === 0 ||
                        value.street.length === 0
                      ) {
                        return 'Невірний формат';
                      }
                    }
                    return true;
                  },
                },
              }}
              render={() => (
                <GoogleMapsInput
                  id="location"
                  autoComplete="true"
                  className="w-full h-full outline-none"
                  placeholder="Адреса проведення"
                  onPlaceSelect={place => {
                    if (!place || !place.geometry) return;
                    const formattedPlace = {
                      venue: '',
                      latitude:
                        place.geometry.location?.lat().toString() || '0',
                      longitude:
                        place.geometry.location?.lng().toString() || '0',
                      street: place.name || '',
                      city: 'Київ',
                    };
                    setValue('location', formattedPlace);
                    trigger('location');
                  }}
                />
              )}
            />
            <div className="h-[20px]">
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <label htmlFor="link" className="pb-3">
            Посилання на Zoom або Google Meet
          </label>
          <div className="w-full h-[52px] p-[2px] bg-createEventInputBorder rounded-[10px]">
            <Controller
              name="eventUrl"
              control={control}
              rules={{
                required: "Посилання обов'язкове",
                validate: {
                  isValid: value => {
                    if (!isOffline) {
                      if (
                        !value.includes('www.') &&
                        !value.includes('https://')
                      ) {
                        return 'Невірний формат';
                      }
                    }
                    return true;
                  },
                },
              }}
              render={() => (
                <input
                  type="text"
                  id="eventUrl"
                  placeholder="https://meet.google.com/..."
                  className="outline-none w-full h-full rounded-[8px] p-4 border-buttonPurple"
                  onChange={e => {
                    const url = e.target.value;
                    setValue('eventUrl', url);
                    trigger('eventUrl');
                  }}
                />
              )}
            />
            <div className="h-[20px]">
              {errors.eventUrl && (
                <p className="text-red-500 text-sm">
                  {errors.eventUrl.message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
