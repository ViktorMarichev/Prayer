import PrayerReducer, {actions} from './slice';
export {getPrayers, createPrayer, deletePrayer, updatePrayer} from './slice';
export const {clearMessage, setIsEdited} = actions;
export {default as prayersSelector} from './selectors';
export default PrayerReducer;
