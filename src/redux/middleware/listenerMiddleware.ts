import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import { EventsApi } from '../events/operations';
import { setCity } from '../filters/filtersSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(setCity),
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(EventsApi.util.invalidateTags(['Events', 'NewEvent']));
  },
});

export default listenerMiddleware;
