import PrayerReducer, {actions} from './slice';
export {getPrayers, createPrayer, deletePrayer, updatePrayer} from './slice';
export const {clearMessage, setEditedPrayer, setRequestStatus} = actions;
export {default as prayersSelector} from './selectors';
export default PrayerReducer;
