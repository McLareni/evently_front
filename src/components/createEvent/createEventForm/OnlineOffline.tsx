import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

import clsx from 'clsx';

import { GoogleMapsInput } from './GoogleMapsInput';

interface OnlineOfflineProps {
  control: Control<CreateEventFormValues>;
  setValue: UseFormSetValue<CreateEventFormValues>;
  watch: UseFormWatch<CreateEventFormValues>;
  errors: FieldErrors<CreateEventFormValues>;
  trigger: UseFormTrigger<CreateEventFormValues>;
  isEdit?: boolean;
}

export const OnlineOffline = ({
  control,
  setValue,
  watch,
  errors,
  trigger,
  isEdit = false,
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
      <span className="lg:pb-4 pb-3 lg:text-2xl text-base">
        Формат події<span className="star">*</span>
      </span>
      <div className="lg:pb-6 pb-3">
        {(!isEdit || isOffline) && (
          <button
            type="button"
            className={`${
              isOffline
                ? 'bg-gradient-to-r from-[#12C2E9] to-[#C471ED] text-[white]'
                : 'bg-gradient-to-r from-[#E9E6FF] to-[#D5FEFF]'
            } hover:from-[#12C2E9] hover:to-[#C471ED] focus:outline-none font-normal lg:text-xl text-base lg:rounded-[20px] rounded-[15px] mr-4 
            lg:py-[9px] py-0 lg:px-[18px] px-4 border-[1px] border-borderColor lg:h-12 h-[36px]`}
            onClick={setOffline}
          >
            Оффлайн
          </button>
        )}

        {(!isEdit || !isOffline) && (
          <button
            type="button"
            className={`${
              !isOffline
                ? 'bg-gradient-to-r from-[#12C2E9] to-[#C471ED] text-[white]'
                : 'bg-gradient-to-r from-[#E9E6FF] to-[#D5FEFF]'
            } hover:from-[#12C2E9] hover:to-[#C471ED] focus:outline-none font-normal lg:text-xl text-base lg:rounded-[20px] rounded-[15px] 
            mr-4 lg:py-[9px] py-0 lg:px-[18px] px-4 border-[1px] border-borderColor lg:h-12 h-[36px]`}
            onClick={setOnline}
          >
            Онлайн
          </button>
        )}
      </div>

      {isOffline ? (
        <div className="flex flex-col w-full">
          <label htmlFor="location" className="pb-3">
            Адреса
          </label>
          <div className="w-full h-[52px] p-[2px] bg-createEventInputBorder lg:rounded-[10px] rounded-[7px]">
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
                  className={clsx(
                    'w-full h-full outline-none lg:rounded-[8px] rounded-[5px] ',
                    {
                      'text-uploadBtnBg bg-white': isEdit,
                    }
                  )}
                  placeholder="Адреса проведення"
                  disabled={isEdit}
                  defaultValue={
                    watch('location.city')
                      ? `${watch('location.city')}, ${watch('location.street')} ${watch('location.venue')}`
                      : ''
                  }
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
          <div className="w-full h-[52px] p-[2px] bg-createEventInputBorder lg:rounded-[10px] rounded-[7px]">
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
                  className={clsx(
                    "outline-none w-full h-full lg:rounded-[8px] rounded-[5px] p-4 border-buttonPurple, {'text-uploadBtnBg bg-white': isEdit}"
                  )}
                  disabled={isEdit}
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
